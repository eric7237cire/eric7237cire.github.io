import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-spanish-root',
  templateUrl: './spanish-root.component.html',
  styleUrls: ['./spanish-root.component.css']
})
export class SpanishRootComponent implements OnInit {

  numSentences = 0;
  numLessons = 0;

  commitSha = environment.commitSha
  commitRefName = environment.commitRefName
  commitTime = environment.commitTime

  constructor(private storageService: StorageService) { }

  async ngOnInit() {
    await this.storageService.ensureCreated();
    this.numLessons = (await this.storageService.retrieveLessons()).length;
    this.numSentences = (await this.storageService.retrieveSentences()).length;

  }

}
