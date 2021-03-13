const logger = require('consola').withScope('nuxt:newrelic')

const requestHandler = app => (req, res, next) => {
    logger.info("invoking request hadndler for req- " + req)
    //newrelic.trackRequest(req, res)
    next()
}

const errorHandler = app => (error, req, res, next) => {
    const e = new Error(error)
    e.stack = error.stack
    //newrelic.noticeError(e)
    next(error)
}

module.exports = {
    requestHandler,
    errorHandler
}