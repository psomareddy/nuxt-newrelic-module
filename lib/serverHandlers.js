const util = require('util')
const logger = require('consola').withScope('nuxt:newrelic')

const requestHandler = app => (req, res, next) => {
    logger.info("invoking request handler for req- " + req)
    console.log(util.inspect(req, {showHidden: false, depth: 1}))
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