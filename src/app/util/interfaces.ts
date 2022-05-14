export interface Lesson {
  num: number
  sentences: Array<SentencePair>
}

export interface SentencePair {
  en: string
  es: string
}
