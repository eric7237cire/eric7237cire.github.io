import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
  repuestas: Array<Answer>
}

interface Answer {
  repuesta: string,
  razón: string,
  indicio: string
}

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
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
  lastAnswers: Array<Answer> = [];
  lastQuestion = "";
  scoreText = "";

  lessons: Array<Lesson> = [];

  correct: Set<number> = new Set<number>();

  @ViewChild('inputans')
  inputAnswer!: ElementRef;

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

    this.route.queryParamMap.subscribe(queryMap => {

      const url = queryMap.get("json");

      if (!url) {
        console.error("Cannot find json url param");
        return;
      }

      this.http.get<Tarea>(url).subscribe(r => {
        this.logService.logMessage(`From ${url} got {r}`);
        this.tarea = r;

        this.problemNumber = 0;
        this.lastAnswers = [];
        this.lastScore = "";
        this.correct = new Set<number>();
        this.diffHtml = [];
        this.lastInputAnswers = [];

        this.handleProblemNumberChanged(0);
      });
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

    this.inputAnswer.nativeElement.focus();

  }

  isCommonWord(word: string) : boolean {
    return COMMON_WORDS.has(word.toLocaleLowerCase());
  }

  handleSpanishInputChange(spanishInput: string, answerIndex: number) {

    this.inputAnswers[answerIndex] = spanishInput.toLocaleUpperCase();

  }

  handleEvaluateAnswers() {

    this.lastInputAnswers = this.inputAnswers;

    this.diffHtml = [];

    const currentProblem = this.tarea.preguntas[this.problemNumber];
    this.lastQuestion = currentProblem.problema;
    
    const dmp = new DiffMatchPatch();

    let numCorrect = 0;

    for(let i = 0; i < this.lastInputAnswers.length; ++i) {
      const spanishAttemptLetters = getUpperCaseLettersAndMapping(this.lastInputAnswers[i]);
      const answerLetters = getUpperCaseLettersAndMapping(currentProblem.repuestas[i].repuesta.toLocaleUpperCase());

      if (spanishAttemptLetters.cleanText == answerLetters.cleanText) {
        numCorrect += 1;
      }

      const diffResults = dmp.diff_main(spanishAttemptLetters.cleanText, answerLetters.cleanText);
      console.log("Diff results", diffResults);
      console.log("Parsed", answerLetters.mapping, answerLetters.cleanText, answerLetters.rawText);
      this.diffHtml.push(
        this.sanitizer.bypassSecurityTrustHtml(diffPrettyHtml(diffResults, answerLetters)));

    }

    this.lastAnswers = currentProblem.repuestas;

    //Choose next correct number
    if (numCorrect == this.lastInputAnswers.length) {
      this.correct.add(this.problemNumber);
    }

    const remaining = this.tarea.preguntas.length - this.correct.size;

    this.lastScore = `${numCorrect} / ${this.lastInputAnswers.length} cierto.  Le quedan ${remaining} problemas.`;


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



}
