const notFoundHandler = (err, req, res, next) => {
    if(err.httpStatusCode === 404){
        res.status(404).send("Not Found!")
    }
    next(err)
}

const badRequistHandler = (err, req, res, next) => {
    if(err.httpStatusCode === 400){
        res.status(400).send("Bad Request!")
    }
    next(err)
}

const unauthorizedHandler = (err, req, res, next) => {
    if(err.httpStatusCode === 401){
        res.status(401).send("Unauthorized!")
    }
    next(err)
}

const forbiddenHandler = (err, req, res, next) => {
    if(err.httpStatusCode === 403){
        res.status(403).send("Foebidden!")
    }
    next(err)
}

const catchAllHandler = (err, req, res, next) => {
    if(err.httpStatusCode === 500){
        res.status(500).send("Generic Server Error!")
    }
    next(err)
}

module.exports = {
    notFoundHandler,
    badRequistHandler,
    unauthorizedHandler,
    forbiddenHandler,
    catchAllHandler
}