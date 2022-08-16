import { Component, OnInit } from '@angular/core';
import {verboseRegExp} from "../util/misc";
import {LoggerService} from "../services/logger.service";
import {Subject, takeUntil} from "rxjs";
import {Lesson} from "../util/interfaces";
import {StorageService} from "../services/storage.service";
import {ActivatedRoute} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {getPuncWordArray, getScore, getUpperCaseLettersAndMapping, getWords} from "../util/string";
import {COMMON_WORDS, diffPrettyHtml} from "../translation-test/translation-test.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {ngxLocalStorage} from "ngx-localstorage";
import {DiffMatchPatch} from "diff-match-patch-typescript";

interface Tarea {
  titulo: string,
  preguntas: Array<Question>
}

interface Question {
  problema: string,
  indicio: string,
  repuestas: Array<Answer>
}

interface Answer {
  repuesta: string,
  razón: string
}

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  tarea!: Tarea;
  fullText: string = "";
  logText: string = "";
  problemNumber: number = 0;


  lastScore = "";

  diffHtml: Array<SafeHtml> = [];

  inputAnswers: Array<string> = [];

  //split into words / punc
  lastProblems: Array<Array<string>> = [];
  lastInputAnswers: Array<string> = [];
  scoreText = "";

  lessons: Array<Lesson> = [];

  correct: Set<number> = new Set<number>();

  private unsubscribe = new Subject<void>();

  constructor(private logService: LoggerService,
              private storageService: StorageService,
              private route: ActivatedRoute,
              private http: HttpClient,
              private sanitizer: DomSanitizer
              ) { }

  ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete()
    }

  ngOnInit(): void {


    this.logService.logMessage("Starting...");

    this.logService.logs.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(values => {
        console.log(values.join("\n"));
      }
    );

    const url = this.route.snapshot.queryParamMap.get("json")!;

    if (!url) {
      console.error("Cannot find json url param");
      return;
    }

    this.http.get<Tarea>(url).subscribe( r => {
      this.logService.logMessage(`From ${url} got {r}`);
      this.tarea = r;

      this.problemNumber = 0;
      this.handleProblemNumberChanged(0);
    });

    this.logService.logs.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(values => {
        this.logText = values.join("\n");
      }
    );
  }

  handleProblemNumberChanged(_num: number = 0) {

    const sentence = this.tarea.preguntas[this.problemNumber];

    this.inputAnswers = [];
    for(let i = 0; i < sentence.repuestas.length; ++i) {
      this.inputAnswers.push("");
    }

  }

  isCommonWord(word: string) : boolean {
    return COMMON_WORDS.has(word.toLocaleLowerCase());
  }

  handleSpanishInputChange(spanishInput: string, answerIndex: number) {

    this.inputAnswers[answerIndex] = spanishInput;

  }

  handleEvaluateAnswers() {

    this.lastInputAnswers = this.inputAnswers;

    this.diffHtml = [];

    const currentProblem = this.tarea.preguntas[this.problemNumber];
    const dmp = new DiffMatchPatch();

    let numCorrect = 0;

    for(let i = 0; i < this.lastInputAnswers.length; ++i) {
      const spanishAttemptLetters = getUpperCaseLettersAndMapping(this.lastInputAnswers[i]);
      const answerLetters = getUpperCaseLettersAndMapping(currentProblem.repuestas[i].repuesta);

      if (spanishAttemptLetters.cleanText == answerLetters.cleanText) {
        numCorrect += 1;
      }

      const diffResults = dmp.diff_main(spanishAttemptLetters.cleanText, answerLetters.cleanText);
      console.log("Diff results", diffResults);
      console.log("Parsed", answerLetters.mapping, answerLetters.cleanText, answerLetters.rawText);
      this.diffHtml.push(
        this.sanitizer.bypassSecurityTrustHtml(diffPrettyHtml(diffResults, answerLetters)));

    }

    this.lastScore = `${numCorrect} / ${this.lastInputAnswers.length} cierto`;

    if (numCorrect == this.lastInputAnswers.length) {
      this.correct.add(this.problemNumber);
    }

    for(let i = 0; i < this.tarea.preguntas.length; ++i) {
      this.problemNumber += 1;
      if (this.problemNumber >= this.tarea.preguntas.length) {
        this.problemNumber = 0;
      }

      //we found the next one to do
      if (!this.correct.has(this.problemNumber)) {
        break;
      }
    }

    this.handleProblemNumberChanged(this.problemNumber);
  }

  // finishSpanishAttempt() {
  //
  //
  //
  //   const score = getScore(this.spanishAttempt, this.spanishText);
  //
  //   this.lastScore = `Score is %${score.toFixed(2)}`;
  //
  //   this.attempts.push( {
  //     lessonNumber: this.lessonNumber, score, sentenceNumber: this.sentenceNumber, spanishAttempt: ""
  //   });
  //
  //   this.lastAttempt = this.spanishAttempt;
  //   this.lastAnswer = getPuncWordArray(this.spanishText);
  //
  //   console.log("Last Answer: ", this.lastAnswer);
  //
  //   const spanishAttemptLetters = getUpperCaseLettersAndMapping(this.spanishAttempt);
  //   const answerLetters = getUpperCaseLettersAndMapping(this.spanishText);
  //
  //   const dmp = new DiffMatchPatch();
  //   const diffResults = dmp.diff_main(spanishAttemptLetters.cleanText, answerLetters.cleanText);
  //   console.log("Diff results", diffResults);
  //   console.log("Parsed", answerLetters.mapping, answerLetters.cleanText, answerLetters.rawText);
  //   this.diffHtml = this.sanitizer.bypassSecurityTrustHtml(diffPrettyHtml(diffResults, answerLetters));
  //
  //
  //   if (score < 100) {
  //     this.nextSentenceNumbers.push(this.sentenceNumber);
  //   }
  //
  //   this.sentenceNumber = this.nextSentenceNumbers[0];
  //   this.nextSentenceNumbers.splice(0, 1);
  //
  //   this.lastScore += ` Remaining: ${this.nextSentenceNumbers.length}`;
  //
  //
  //   this.spanishAttempt = "";
  //
  //   this.handleSentenceNumberChanged();
  // }

}
