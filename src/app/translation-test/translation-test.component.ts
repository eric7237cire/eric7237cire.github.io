import { Component, OnInit } from '@angular/core';
import {ngxLocalStorage} from 'ngx-localstorage';
import {AnswerAttempt, Lesson} from "../util/interfaces";
import {StorageService} from "../services/storage.service";
import {getScore, getWords} from "../util/string";
import {RingBuffer} from "ring-buffer-ts";

@Component({
  selector: 'app-translation-test',
  templateUrl: './translation-test.component.html',
  styleUrls: ['./translation-test.component.css']
})
export class TranslationTestComponent implements OnInit {

  @ngxLocalStorage({nullTransformer: () => 0})
  lessonNumber!: number;

  sentenceNumber!: number;

  englishText: string = "";
  spanishText: string = "";
  hintStructure: string = "";
  spanishWords: number = 0;

  lastAnswer = "";
  lastAttempt = "";
  lastScore = "";

  @ngxLocalStorage({nullTransformer: () => ""})
  spanishAttempt!: string;
  scoreText = "";

  attempts: Array<AnswerAttempt> = [];
  lessonData: Array<Lesson> = [];
  currentLesson!: Lesson;
  nextSentenceNumbers: Array<number> = [];

  showAnswer = false;
  showStructure = true;

  constructor(private storageService: StorageService)
  {

  }

  async ngOnInit() {

    await this.storageService.ensureCreated();
    this.lessonData = await this.storageService.retrieveLessons();
    this.handleLessonNumberChanged();


  }

  handleLessonNumberChanged(_num = 0) {
    this.currentLesson = this.lessonData.find( lesson => lesson.num == this.lessonNumber)!;

    this.sentenceNumber = 0;

    this.nextSentenceNumbers = [];
    for(let s = 1; s < this.currentLesson.sentences.length; ++s) {
      this.nextSentenceNumbers.push(s)
    }

    this.lastScore = `Remaining ${this.nextSentenceNumbers.length}`;
    this.lastAttempt = "";
    this.lastAnswer = "";

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
    this.lastAnswer = this.spanishText;

    if (score < 100) {
      this.nextSentenceNumbers.push(this.sentenceNumber);
    }

    this.sentenceNumber = this.nextSentenceNumbers[0];
    this.nextSentenceNumbers.splice(0, 1);

    this.lastScore += ` Remaining: ${this.nextSentenceNumbers.length}`;


    this.spanishAttempt = "";

    this.handleSentenceNumberChanged();
  }

}
