import compareWords from "./compareWords";

export default function filterWordListFromGuess(guess: string, result: string, wordList: string[]): string[] {
    return wordList.filter(word => compareWords(word, guess) === result)
}
