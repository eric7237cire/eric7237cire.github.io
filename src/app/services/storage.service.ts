import {Injectable} from '@angular/core';
import {IDBPDatabase, openDB} from "idb";
import {Lesson} from "../util/interfaces";


const IDB_NAME = "lessonData";
const TABLE_LESSONS = "lessons";
const TABLE_SENTENCES = "sentences";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private db!: IDBPDatabase<unknown>;

  constructor() {
  }

  public async ensureCreated(): Promise<void> {

    this.db = await openDB(IDB_NAME, 2, {
      upgrade(db: IDBPDatabase) {

        try {
          db.createObjectStore(TABLE_LESSONS, {autoIncrement: false, keyPath: 'num'});
        } catch (e) {
          console.error(e);
        }
        try {
          db.createObjectStore(TABLE_SENTENCES, {autoIncrement: false, keyPath: 'num'});
        } catch (e) {
          console.error(e);
        }
      },
    });

  }

  public async storeLessons(lessons: Array<Lesson>) {
    const tx = this.db.transaction(TABLE_LESSONS, 'readwrite');
    const store = tx.objectStore(TABLE_LESSONS);
    await store.clear();
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

  public async storeSentences(lessons: Array<Lesson>) {
    const tx = this.db.transaction(TABLE_SENTENCES, 'readwrite');
    const store = tx.objectStore(TABLE_SENTENCES);
    await store.clear();
    for (const value of lessons) {
        const result = await store.put(value);
        console.log('Put Bulk Data ', result);
    }
  }

  public async retrieveSentences() : Promise<Array<Lesson>> {
    const tx = this.db.transaction(TABLE_SENTENCES, 'readonly');
    const store = tx.objectStore(TABLE_SENTENCES);
    return await store.getAll();
  }
}
