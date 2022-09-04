import {Component, OnInit} from '@angular/core';
import {StorageService} from "../services/storage.service";
import {environment} from "../../environments/environment";
import {SwUpdate, VersionReadyEvent} from "@angular/service-worker";
import {filter, map, tap} from "rxjs";

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

  constructor(private storageService: StorageService,
              private swUpdate: SwUpdate) {
  }

  async ngOnInit() {
    await this.storageService.ensureCreated();
    this.numLessons = (await this.storageService.retrieveLessons()).length;
    this.numSentences = (await this.storageService.retrieveSentences()).length;

    console.log(`ngOnInit -- commitTime ${environment.commitTime}`);

    if (this.swUpdate.isEnabled) {

      this.swUpdate.versionUpdates.pipe(
        tap(evt => console.log("Recieved event sw update", evt)),
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion,
        }))).subscribe(() => {
        window.location.reload();
      });
    } else {
      console.log("No sw update enabled");
    }
  }

}
