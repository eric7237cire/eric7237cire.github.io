import { Component, OnInit } from '@angular/core';
import {ngxLocalStorage} from 'ngx-localstorage';
import {AnswerAttempt, Lesson} from "../util/interfaces";
import {StorageService} from "../services/storage.service";
import {getScore, getWords} from "../util/string";

@Component({
  selector: 'app-translation-test',
  templateUrl: './translation-test.component.html',
  styleUrls: ['./translation-test.component.css']
})
export class TranslationTestComponent implements OnInit {

  @ngxLocalStorage()
  lessonNumber!: number;

  @ngxLocalStorage({nullTransformer: () => 0})
  sentenceNumber!: number;

  englishText: string = "";
  spanishText: string = "";
  hintStructure: string = "";
  spanishWords: number = 0;

  @ngxLocalStorage({nullTransformer: () => ""})
  spanishAttempt!: string;
  scoreText = "";

  attempts: Array<AnswerAttempt> = [];
  lessonData: Array<Lesson> = [];
  currentLesson!: Lesson;

  showAnswer = false;
  showStructure = false;

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
    this.hintStructure = this.spanishText.replace(/\w/g, "_");

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

    this.scoreText = `Score is ${score}`;
  }

  finishSpanishAttempt() {
    this.sentenceNumber += 1;
    this.spanishAttempt = "";
    this.handleSentenceNumberChanged();
  }

}
