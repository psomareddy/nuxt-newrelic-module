const newrelic = require('newrelic')
const util = require('util')
const logger = require('consola').withScope('nuxt:newrelic')

const requestHandler = app => (req, res, next) => {
    //logger.info("invoking request handler for req- " + req.url)
    //console.log(util.inspect(req, {showHidden: false, depth: 1}))
    //newrelic.setTransactionName(req.url)
    console.trace("request handler trace")
    next()
}

const errorHandler = app => (error, req, res, next) => {
    const e = new Error(error)
    e.stack = error.stack
    newrelic.noticeError(e)
    next(error)
}

module.exports = {
    requestHandler,
    errorHandler
}