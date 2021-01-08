const express = require("express")
require("dotenv").config()
const listEndpoints = require("express-list-endpoints")
const cors = require("cors")
const examsRouter = require("./exams")
const {
    notFoundHandler,
    badRequistHandler,
    unauthorizedHandler,
    forbiddenHandler,
    catchAllHandler
} = require("./errorHandlers")


const server = express()

server.use(cors())

server.use(express.json())

server.use("/exams", examsRouter)

const port = process.env.PORT || 3005

server.use(notFoundHandler)
server.use(badRequistHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))

server.listen(port, () => console.log("Server is running on port", port))

