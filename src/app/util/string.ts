import levenshtein from "js-levenshtein";

function isLetter(c: string) : boolean {
  return c.toLowerCase() != c.toUpperCase();
}

export interface OL_M {
  rawText: string,
  cleanText: string,
  mapping: Array<number>
}
export function getUpperCaseLettersAndMapping(rawStr: string) : OL_M {

  const mapping: Array<number> = [];
  const onlyLetters: Array<string> = [];
  let lastWasSpace = false;

  for (let i = 0; i < rawStr.length; i++) {
    const ch = rawStr.charAt(i);
    if (isLetter(ch)) {
      onlyLetters.push(ch.toLocaleLowerCase());
      mapping.push(i);
      lastWasSpace = false;
    } else {
      if (!lastWasSpace) {
        onlyLetters.push(" ");
        mapping.push(i);
        lastWasSpace = true;
      }
    }
  }

  return {
    mapping, rawText: rawStr, cleanText: onlyLetters.join("")
  }
}

//returns even indexes as spaces/punctionation; odd as words
export function getPuncWordArray(rawStr: string): Array<string> {
  const pieces: Array<string> = [""];
  let currentIndex = 0;

  for (let i = 0; i < rawStr.length; i++) {

    let isPuncOrSpaces = currentIndex % 2 == 0;
    const ch = rawStr.charAt(i);
    let isChALetter = isLetter(ch);

    if ( (isPuncOrSpaces && isChALetter) || (
      (!isPuncOrSpaces && !isChALetter)
    )) {
      ++currentIndex;
      pieces.push("");
    }

    pieces[currentIndex] += ch;

  }

  return pieces;
}

function stripPunctuation(str: string): string {
  return str.replace(/[,¿?;.!¡:'"()…—-’`“”‘’]/g, "");
}

export function getWords(str: string): Array<string>
{
   return stripPunctuation(str).split(/\s+/).filter(s => s.length > 0).map(s => s.trim());
}

export function getScore(answerAttempt: string, correctAnswer: string) : number {

  if (!correctAnswer || correctAnswer.length == 0) {
    return 0;
  }
  if (!answerAttempt || answerAttempt.length == 0) {
    return 0;
  }

  let attemptUpper: string = answerAttempt.toLocaleUpperCase();
  let correctAnswerUpper: string = correctAnswer.toLocaleUpperCase();

  const attemptWords = getWords(attemptUpper);
  const correctWords = getWords(correctAnswerUpper);
  const correctWordsLength = correctWords.length;

  //For each search word, take the best score and add it
  //each perfect word match is == 1

  //Also initialize the score with an overall match, same thing overall match is 1
  const len = Math.max(attemptUpper.length, correctAnswerUpper.length);
  const ld = levenshtein( attemptWords.join(" "), correctWords.join(" "));

  let totalDiff = 1-ld/len;

  //If the search name is only 1 word, return the min levenstein of the matching words
  for(const searchWord of attemptWords) {
    let bestScore = -1;
    let bestIndex = -1;

    if (correctWords.length <= 0) {
      break;
    }
    for (const [idx, settlementWord] of correctWords.entries()) {
      const len = Math.max(settlementWord.length, searchWord.length);
      const ld = levenshtein(searchWord, settlementWord);
      //add a small score for a single word match
      const nd = 1 - ld / len;
      if (nd > bestScore) {
        bestScore = nd;
        bestIndex = idx;
      }
    }

    //remove the settlement word
    correctWords.splice(bestIndex, 1);

    totalDiff += bestScore;
  }

  return 100 * totalDiff / (1+correctWordsLength);


}
