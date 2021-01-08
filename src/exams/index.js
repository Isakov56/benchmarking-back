const express = require("express")
const { getQuestions, shuffleQuestions, getCandidates, writeCandidates } = require("../utilities")

const uniqid = require("uniqid")

const examsRouter = express.Router()


examsRouter.post("/start", async (req,res,next) => {
    let total = 0
    try {
        const questions = await getQuestions()
        // const ranQuestions = shuffleQuestions(questions, 5)
        const candidatesDB = await getCandidates()
        candidatesDB.push({
            ...req.body,
            _id: uniqid(),
            name: "Adimission Test",
            totalScore: 0,
            isCopleted: false,
            createdAt: new Date(),
            questions: questions.splice(0, 5)
        })

        await writeCandidates(candidatesDB)
        res.send(candidatesDB)
    } catch (error) {
        next(error)
    }
})

examsRouter.post("/:id/answer", async (req, res, next) =>{
    try {
        const candidatesDB = await getCandidates()
        console.log(candidatesDB)
        const candidateFound = candidatesDB.findIndex(candidate => candidate._id === req.params.id)
        console.log("my candidataeFound", candidateFound)
        console.log("here", candidatesDB[candidateFound].questions[2])
        if(candidateFound !== -1){
            const questionIndex = req.body.question
            const selectedQuestion = candidatesDB[candidateFound].questions[questionIndex]
            console.log("here 2", selectedQuestion)
            const answerIndex = req.body.answer
            selectedQuestion.providedAnswer = null
            console.log("here 3", selectedQuestion)
            selectedQuestion.providedAnswer = answerIndex
            const score = (selectedQuestion.answers[answerIndex].isCorrect ? 20 : 0)
            candidatesDB[candidateFound].totalScore += score

            const updatedCandidates = 
    
            await writeCandidates(candidatesDB)
            res.status(201).send(candidatesDB[candidateFound])
        }else{
            const err = new Error()
            err.httpStatusCode = 404
            next(err)
        }
    } catch (error) {
        next(error)
    }

})

examsRouter.get("/:id", async (req, res , next) => {
    try {
        const candidatesDB = await getCandidates()
        const candidateFound = candidatesDB.findIndex(candidate => candidate._id === req.params.id)
        if(candidateFound !== -1){
            res.status(201).send(candidatesDB[candidateFound])
        }else{
            const err = new Error()
            err.httpStatusCode = 404
            next(err)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = examsRouter