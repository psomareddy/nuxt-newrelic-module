const newrelic = require('newrelic')
const cheerio = require('cheerio')
const util = require('util')
const path = require('path')
const deepMerge = require('deepmerge')
const logger = require('consola').withScope('nuxt:newrelic')
const { requestHandler, errorHandler } = require('./serverHandlers')

module.exports = function newrelicModule(moduleOptions) {
    const defaults = {
        disabled: process.env.NEWRELIC_DISABLED || false,
        disableClientSide: process.env.NEWRELIC_DISABLE_CLIENT_SIDE || false,
        disableServerSide: process.env.NEWRELIC_DISABLE_SERVER_SIDE || false,
        serverConfig: {},
        clientConfig: {}
    }
    const { nuxt } = this
    const options = deepMerge.all([defaults, moduleOptions])

    if (options.disabled) {
        return
    }

    if (!options.disableClientSide) {
        this.addPlugin({
            src: path.resolve(__dirname, './newrelic.client.js'),
            fileName: 'newrelic/plugin.client.js',
        })
    }

    if (!options.disableServerSide) {
        this.addPlugin({
            src: path.resolve(__dirname, './newrelic.server.js'),
            fileName: 'newrelic/plugin.server.js',
        })

        this.nuxt.hook('render:setupMiddleware', app => app.use(requestHandler()))
        this.nuxt.hook('render:errorMiddleware', app => app.use(errorHandler()))
        this.nuxt.hook('generate:routeFailed', ({ route, errors }) => {
            errors.forEach(({ error }) => {
                newrelic.noticeError(error, { 'url': route.path, 'route': route.name ?? "anonymous" })
            })
        })
        this.nuxt.hook('render:route', (url, result, context) => {
            // inject newrelic browser script
            const newrelicScript = newrelic.getBrowserTimingHeader()
            const script$ = cheerio.load(newrelicScript)
            console.log(util.inspect(context.app, {showHidden: false, depth: 1}))
            /* // did not work, context.app does not have head prop
            context.app.head.script.push({
                innerHTML: script$('script').html(), // don`t like this one
                type: 'text/javascript',
            })
            */
            if (context.route !== undefined && context.route !== null) {
                //newrelic.setTransactionName(context.route.name)
                newrelic.setTransactionName(context.route.matched[0].path.slice(1))  // use page router pattern as transaction name
                newrelic.addCustomAttribute("route", context.route.name)
            } else {
                //newrelic.setTransactionName(context.route.matched[0].path.slice(1))  // use page router pattern as transaction name
                //unfortunately routes may not be named, so we need a fallback
                console.log("render:route: url is " + url + " // undefined")
            }
        })
    }
}

module.exports.meta = require('../package.json')