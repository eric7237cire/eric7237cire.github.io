import {Injectable} from '@angular/core';
import {IDBPDatabase, openDB} from "idb";
import {Lesson} from "../util/interfaces";


const IDB_NAME = "lessonData";
const TABLE_LESSONS = "lessons";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private db!: IDBPDatabase<unknown>;

  constructor() {
  }

  public async ensureCreated(): Promise<void> {

    this.db = await openDB(IDB_NAME, 1, {
      upgrade(db: IDBPDatabase) {

        db.createObjectStore(TABLE_LESSONS, {autoIncrement: false, keyPath: 'num'});

      },
    });

  }

  public async storeLessons(lessons: Array<Lesson>) {
    const tx = this.db.transaction(TABLE_LESSONS, 'readwrite');
    const store = tx.objectStore(TABLE_LESSONS);
    for (const value of lessons) {
        const result = await store.put(value);
        console.log('Put Bulk Data ', result);
    }
  }

  public async retrieveLessons() : Promise<Array<Lesson>> {
    const tx = this.db.transaction(TABLE_LESSONS, 'readonly');
    const store = tx.objectStore(TABLE_LESSONS);
    return await store.getAll();
  }
}
