import readline from "readline"
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

function compareWords(first: string, second: string): string {
    return Array.from(second).map((letter, index) => {
        if (first[index] == letter) {
            return "🟩"
        }
        if (first.includes(letter)) {
            return "🟨"
        }
        return "⬛"
    }).join("")
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
    let remainingAnswers = [...possibleAnswers].sort() // Sort in case of possible spoilers
    let remainingWords = [...possibleGuesses]
    summariseRemainingWords(remainingAnswers, remainingWords)
    for (let i = 1; i <= 6; i++) {
        const guess = await prompt(`Enter your guess number ${i}: `)
        const result = compareWords(correctAnswer, guess)
        console.log(result)
        remainingAnswers = remainingAnswers.filter(answer => compareWords(answer, guess) == result)
        remainingWords = remainingWords.filter(word => compareWords(word, guess) == result)
        summariseRemainingWords(remainingAnswers, remainingWords)
    }
    return
}

main()
