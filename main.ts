import readline from "readline"
import compareWords from "./compareWords"
import filterWordListFromGuess from "./filterWordListFromGuess"
import { possibleAnswers, possibleGuesses } from "./words"

const readlinePrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function prompt(question: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            readlinePrompt.question(question, resolve)
        } catch (e) {
            reject(e)
        }
    })
}
function summariseRemainingWords(remainingAnswers: string[], remainingGuesses: string[]) {
    const answers = remainingAnswers.length
    const words = remainingGuesses.length + answers
    console.log(`There are ${words} words remaining, of which ${answers} are possible answers`)
    if (remainingAnswers.length <= 10) {
        console.log("Remaining answers: " + remainingAnswers.join(", "))
    }
}

async function main() {
    const correctAnswer = await prompt("What was the correct answer?\n")
    let remainingAnswers = [...possibleAnswers]
    let remainingWords = [...possibleGuesses]
    summariseRemainingWords(remainingAnswers, remainingWords)
    for (let i = 1; i <= 6; i++) {
        const guess = await prompt(`Enter your guess number ${i}: `)
        const result = compareWords(correctAnswer, guess)
        console.log(result)
        remainingAnswers = filterWordListFromGuess(guess, result, remainingAnswers)
        remainingWords = filterWordListFromGuess(guess, result, remainingWords)
        summariseRemainingWords(remainingAnswers, remainingWords)
    }
    return
}

main()
