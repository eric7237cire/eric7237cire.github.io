import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ngxLocalStorage} from 'ngx-localstorage';
import {AnswerAttempt, Lesson} from "../util/interfaces";
import {StorageService} from "../services/storage.service";
import {getPuncWordArray, getScore, getUpperCaseLettersAndMapping, getWords, OL_M} from "../util/string";
import {Diff, DiffMatchPatch} from "diff-match-patch-typescript";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-translation-test',
  templateUrl: './translation-test.component.html',
  styleUrls: ['./translation-test.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TranslationTestComponent implements OnInit {

  @ngxLocalStorage({nullTransformer: () => 0})
  lessonNumber!: number;

  sentenceNumber!: number;

  englishText: string = "";
  spanishText: string = "";
  hintStructure: string = "";
  spanishWords: number = 0;

  lastAnswer: Array<string> = [];
  lastAttempt = "";
  lastScore = "";

  prettyHtml: SafeHtml = "";

  @ngxLocalStorage({nullTransformer: () => ""})
  spanishAttempt!: string;
  scoreText = "";

  attempts: Array<AnswerAttempt> = [];
  lessonData: Array<Lesson> = [];
  sentenceData: Array<Lesson> = [];
  isSentences = false;
  currentLesson!: Lesson;
  nextSentenceNumbers: Array<number> = [];

  showAnswer = false;
  showStructure = true;

  constructor(
    private storageService: StorageService,
    private sanitizer: DomSanitizer
    )
  {

  }

  async ngOnInit() {

    await this.storageService.ensureCreated();
    this.lessonData = await this.storageService.retrieveLessons();
    this.sentenceData = await this.storageService.retrieveSentences();

    this.handleLessonNumberChanged();


  }

  handleLessonNumberChanged(_num = 0) {
    let lessons: Array<Lesson>;
    if (this.isSentences) {
      lessons = this.sentenceData;
    } else {
      lessons = this.lessonData;
    }

    this.currentLesson = lessons.find(lesson => lesson.num == this.lessonNumber)!;

    if (!this.currentLesson) {
      this.lastScore = "Lesson not found";
      return;
    }
    this.sentenceNumber = 0;

    this.nextSentenceNumbers = [];
    for(let s = 1; s < this.currentLesson.sentences.length; ++s) {
      this.nextSentenceNumbers.push(s)
    }

    this.lastScore = `Remaining ${this.nextSentenceNumbers.length}`;
    this.lastAttempt = "";
    this.lastAnswer = [];

    this.handleSentenceNumberChanged();
  }

  handleSentenceNumberChanged(_num: number = 0) {
    if (!this.currentLesson) {
      this.englishText = "Lesson not found";
      return;
    }

    const sentence = this.currentLesson.sentences[this.sentenceNumber];

    if (!sentence) {
      this.englishText = "Sentence not found";
      return;
    }

    this.englishText = sentence.en;
    this.spanishText = sentence.es;
    this.spanishWords = getWords(this.spanishText).length;
    this.hintStructure = this.spanishText.replace(/[\wúÚéÉáÁóÓíÍñÑ]/g, "_");

    this.handleSpanishInputChange(this.spanishAttempt);
  }

  handleShowStructure() {
    this.showStructure = !this.showStructure;
  }
  handleShowAnswer() {
    this.showAnswer = !this.showAnswer;
  }

  handleSpanishInputChange(spanishInput: string) {
    this.spanishAttempt = spanishInput;

    const score = getScore(this.spanishAttempt, this.spanishText).toFixed(2);

    this.scoreText = `Score is %${score}`;
  }

  finishSpanishAttempt() {



    const score = getScore(this.spanishAttempt, this.spanishText);

    this.lastScore = `Score is %${score.toFixed(2)}`;

    this.attempts.push( {
      lessonNumber: this.lessonNumber, score, sentenceNumber: this.sentenceNumber, spanishAttempt: ""
    });

    this.lastAttempt = this.spanishAttempt;
    this.lastAnswer = getPuncWordArray(this.spanishText);

    console.log("Last Answer: ", this.lastAnswer);

    const spanishAttemptLetters = getUpperCaseLettersAndMapping(this.spanishAttempt);
    const answerLetters = getUpperCaseLettersAndMapping(this.spanishText);

    const dmp = new DiffMatchPatch();
    const diffResults = dmp.diff_main(spanishAttemptLetters.cleanText, answerLetters.cleanText);
    console.log("Diff results", diffResults);
    console.log("Parsed", answerLetters.mapping, answerLetters.cleanText, answerLetters.rawText);
    this.prettyHtml = this.sanitizer.bypassSecurityTrustHtml(diffPrettyHtml(diffResults, answerLetters));


    if (score < 100) {
      this.nextSentenceNumbers.push(this.sentenceNumber);
    }

    this.sentenceNumber = this.nextSentenceNumbers[0];
    this.nextSentenceNumbers.splice(0, 1);

    this.lastScore += ` Remaining: ${this.nextSentenceNumbers.length}`;


    this.spanishAttempt = "";

    this.handleSentenceNumberChanged();
  }

  isCommonWord(word: string) : boolean {
    return COMMON_WORDS.has(word.toLocaleLowerCase());
  }

}

const COMMON_WORDS = new Set<string>([
  "tú",
  "y",
  "la",
  "del",
  "de",
  "un",
  "que",
  "no",
  "el",
  "a",
  "e",
  "se",
  "los",
  "las",
  "en",
  "me",
  "les",
  "he",
  "pero",
  "ti",
  "sé",
  "es"
]);

function escapeHtml(unsafe:string) : string {
    return unsafe.replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
}

interface AnswerPositions {
  raw: number;
  clean: number;
}

const DIFF_INSERT = 1;
const DIFF_DELETE = -1;
const DIFF_EQUAL = 0;
/**
 * Convert a diff array into a pretty HTML report.
 */
function diffPrettyHtml(diffs: Array<Diff>, spanishAnswer: OL_M) {
  const html = [];

  const positions: AnswerPositions = {clean: 0, raw: 0};

  for (let x = 0; x < diffs.length; x++) {
    const op = diffs[x][0];    // Operation (insert, delete, equal)
    const data = diffs[x][1];  // Text of change.
    const text = escapeHtml(data);

    //inserts and equal match the answer
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins>' + applyAnswerText(text, positions, spanishAnswer) + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del>' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + applyAnswerText(text, positions, spanishAnswer) + '</span>';
        break;
    }
  }
  return html.join('');
}

function applyAnswerText(text: string, positions: AnswerPositions, answer: OL_M) : string {
  //If we are doing insert, we only do the letters

  //console.log(`Processing [${text}] -- ${positions.raw} and ${positions.clean}`);
  const applied: Array<string> = [];

    for (let i = 0; i < text.length; ++i) {
      //space is a place holder for whitespace / punctuation
      if (text.charAt(i) == " ") {

        let fromInRaw = answer.mapping[positions.clean];
        let toInRaw = answer.rawText.length;
        if (positions.clean + 1 < answer.mapping.length) {
          toInRaw = answer.mapping[positions.clean+1];
        }
        //console.log(`Space from ${fromInRaw} to ${toInRaw}.  Clean pos ${positions.clean} [${answer.cleanText[positions.clean]}] raw pos ${positions.raw}`);
        for(let j = fromInRaw; j < toInRaw; ++j) {
          applied.push(answer.rawText.charAt(positions.raw));
          ++positions.raw;
        }
      } else {
        applied.push(answer.rawText.charAt(positions.raw));
        ++positions.raw;
      }

      ++positions.clean;
    }

  return applied.join("");
}
