import { Component, OnInit } from '@angular/core';
import {verboseRegExp} from "../util/misc";
import {LoggerService} from "../services/logger.service";
import {Subject, takeUntil} from "rxjs";
import {Lesson} from "../util/interfaces";

const LOCAL_STORAGE_KEY = "fullText";

const LESSON_REGEX = new RegExp(verboseRegExp`
  (
  ?<lessonNumber>
  \d+
  ) // digits
  \.
  \s*
  Lecció
`, "");


const SENTENCE_REGEX = new RegExp(verboseRegExp`
  (
  ?<sentenceNumber>
  \d+
  ) // digits
  \.
  \s*
  (?<sentenceContent>\S.*)
`, "");

@Component({
  selector: 'app-data-load',
  templateUrl: './data-load.component.html',
  styleUrls: ['./data-load.component.css']
})
export class DataLoadComponent implements OnInit {

  fullText: string = "";
  logText: string = "";

  private unsubscribe = new Subject<void>();

  constructor(private logService: LoggerService) { }

  ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete()
    }

  ngOnInit(): void {
    this.fullText = localStorage.getItem(LOCAL_STORAGE_KEY) || "Load file needed";

    try {
      this.parseText();
    } catch(e) {
      this.logService.logMessage(`Error ${e}`);
    }

    this.logService.logMessage("Starting...");
    this.logService.logs.pipe(
      takeUntil(this.unsubscribe)
    ).subscribe(values => {
        this.logText = values.join("\n");
      }
    );
  }

  private parseText() {
    const lines = this.fullText.split("\n");
    let match;

    const lessons : Array<Lesson> = [];

    for(const line of lines) {
      if ( (match = line.match(LESSON_REGEX)) !== null ) {
        const lessonNumber = parseInt( match.groups!["lessonNumber"] );
        this.logService.logMessage(`Match!  ${line} Lesson -- ${lessonNumber} `);

        lessons.push( {
          num: lessonNumber, sentences: []
        })
        //this.logService.logMessage(`Match!  ${line}  ${match.groups![1]}`);
      }
      else if ( (match = line.match(SENTENCE_REGEX)) !== null ) {
        const lesson = lessons[lessons.length-1];
        const sentenceNumber = parseInt(match.groups!["sentenceNumber"]);
        const sentenceContent = match.groups!["sentenceContent"];

        if (lesson.sentences.length == sentenceNumber) {
          lesson.sentences.push({
            en: "", es: sentenceContent
          });
          this.logService.logMessage(`Adding spanish ${sentenceNumber} to lesson ${lesson.num}`);
        } else {
          this.logService.logMessage(`Adding english ${sentenceNumber} to lesson ${lesson.num}`);
          lesson.sentences[sentenceNumber].en = sentenceContent;
        }
      }
      else {
        //this.logService.logMessage(`Not a Match!  ${line}`);
      }
    }
  }

  loadFile(e: Event) {

    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log('csv content', e.target.result);

      localStorage.setItem(LOCAL_STORAGE_KEY, e.target.result);
    };

    const inputElement = e.currentTarget as HTMLInputElement;
    reader.readAsText(inputElement.files![0], "UTF-8");
  }

}
