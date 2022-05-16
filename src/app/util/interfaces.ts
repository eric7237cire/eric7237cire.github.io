export interface Lesson {
  num: number
  sentences: Array<SentencePair>
}

export interface SentencePair {
  en: string
  es: string
}

export interface AnswerAttempt {
  lessonNumber: number
  sentenceNumber: number
  spanishAttempt: string
  //100 is best, 0 worst
  score: number
}
