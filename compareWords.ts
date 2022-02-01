export default function compareWords(first: string, second: string): string {
    return Array.from(second).map((letter, index) => {
        if (first[index] == letter) {
            return "🟩"
        }
        if (first.includes(letter)) {
            const indexOfMatchingLetter = first.indexOf(letter)
            if (Array.from(second)[indexOfMatchingLetter] == letter) {
                return "⬛"
            }
            return "🟨"
        }
        return "⬛"
    }).join("")
}
