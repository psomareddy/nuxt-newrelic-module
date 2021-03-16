const newrelic = require('newrelic')
const util = require('util')
const logger = require('consola').withScope('nuxt:newrelic')

const requestHandler = app => (req, res, next) => {
    if (process.client) {
        logger.info("clientside, invoking request handler for req- " + req.url)
    } 
    if (process.server) {
        logger.info("serverside, invoking request handler for req- " + req.url)
    }
    //console.log(util.inspect(req, {showHidden: false, depth: 1}))
    //newrelic.setTransactionName(req.url)
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