import levenshtein from "js-levenshtein";

export function getWords(name1: string): Array<string>
{
   return name1.split(/\s+/).filter(s => s.length > 0);
}

export function getScore(answerAttempt: string, correctAnswer: string) : number {

  if (!correctAnswer || correctAnswer.length == 0) {
    return 0;
  }
  if (!answerAttempt || answerAttempt.length == 0) {
    return 0;
  }

  let searchNameUpper: string = answerAttempt.toLocaleUpperCase();
  let settlementNameUpper: string = correctAnswer.toLocaleUpperCase();

  const searchWords = getWords(searchNameUpper);
  const settlementWords = getWords(settlementNameUpper);

  //For each search word, take the best score and add it
  //each perfect word match is == 1

  //Also initialize the score with an overall match, same thing overall match is 1
  const len = Math.max(searchNameUpper.length, settlementNameUpper.length);
  const ld = levenshtein(searchNameUpper, settlementNameUpper);

  let totalDiff = 1-ld/len;

  //If the search name is only 1 word, return the min levenstein of the matching words
  for(const searchWord of searchWords) {
    let bestScore = -1;
    let bestIndex = -1;

    if (settlementWords.length <= 0) {
      break;
    }
    for (const [idx, settlementWord] of settlementWords.entries()) {
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
    settlementWords.splice(bestIndex, 1);

    totalDiff += bestScore;
  }

  return totalDiff;


}
