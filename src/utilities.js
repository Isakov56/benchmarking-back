const { readJson, writeJson, write} = require("fs-extra")
const { join } = require("path")

const questionsPath = join(__dirname, "./exams/questions.json")
const candidatesPath = join(__dirname, "./exams/candidates.json")

const readDB = async filePath => {
    try {
        const fileJson = await readJson(filePath)
        return fileJson
    } catch (error) {
        throw new Error(error)
    }
}

const writeDB = async (filePath, fileContent) => {
    try {
        await writeJson(filePath, fileContent)
    } catch (error) {
        throw new Error(error)
    }
}

function shuffleArray(array, n) {
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

module.exports = {
    getQuestions: async () => readDB(questionsPath),
    shuffleQuestions:   (questionsArray, n) => shuffleArray(questionsArray, n),
    getCandidates: async () => readDB(candidatesPath),
    writeCandidates: async candidatesData => writeDB(candidatesPath, candidatesData)
}