
import compareWords from "./compareWords"
import filterWordListFromGuess from "./filterWordListFromGuess"
import { possibleAnswers, possibleGuesses } from "./words"
import { writeFileSync } from "fs"

function generateAllPossibleResultStrings(): string[] {
    const chars = ["🟩", "🟨", "⬛"]
    // I'm not proud of this...
    let result = []
    for (let i1 = 0; i1 < 3; i1++) {
        for (let i2 = 0; i2 < 3; i2++) {
            for (let i3 = 0; i3 < 3; i3++) {
                for (let i4 = 0; i4 < 3; i4++) {
                    for (let i5 = 0; i5 < 3; i5++) {
                        result.push([
                            chars[i1],
                            chars[i2],
                            chars[i3],
                            chars[i4],
                            chars[i5]
                        ].join(""))
                    }
                }
            }
        }
    }
    return result
}

function getBestPossibleGuess(possibleAnswers: string[], possibleGuesses: string[]): [string, number] {
    const allWords = [...possibleAnswers, ...possibleGuesses].sort()
    const allResults = generateAllPossibleResultStrings()

    const results = Object.fromEntries(allWords.map((word, idx) => {
        process.stdout.write(`\rWord ${idx} / ${allWords.length}`)
        const remainingAnswersPerResult = Object.fromEntries(allResults.map(result =>
            [result, filterWordListFromGuess(word, result, possibleAnswers).length]))

        let score = 0
        for (const answer in possibleAnswers) {
            const result = compareWords(answer, word)
            score += remainingAnswersPerResult[result] 
        }
        return [word, score / possibleAnswers.length]
    }))

    writeFileSync("results.json", JSON.stringify(results, null, 2))

    return Object.entries(results).sort(([_w1, score1], [_w2, score2]) => score1 - score2)[0]
}

function main() {
    const [bestGuess, score] = getBestPossibleGuess(possibleAnswers, possibleGuesses)
    console.log(`The best possible first word guess is "${bestGuess}", which leaves on average ${score} possible answers`)
}

main()
