const path = require('path')
const deepMerge = require('deepmerge')
const newrelic = require('newrelic')
const logger = require('consola').withScope('nuxt:newrelic')
const { requestHandler, errorHandler } = require('./serverHandlers')

module.exports = function newrelicModule(moduleOptions) {
    const defaults = {
        instrumentationKey: process.env.NEWRELIC_INSTRUMENTATION_KEY || false,
        disabled: process.env.NEWRELIC_DISABLED || false,
        initialize: process.env.NEWRELIC_INITIALIZE || true,
        disableClientSide: process.env.NEWRELIC_DISABLE_CLIENT_SIDE || false,
        disableServerSide: process.env.NEWRELIC_DISABLE_SERVER_SIDE || false,
        trackPageView: process.env.NEWRELIC_TRACK_PAGE_VIEW || true,
        serverConfig: {},
        clientConfig: {}
    }
    const { nuxt } = this
    const options = deepMerge.all([defaults, moduleOptions])

    if (options.disabled) {
        logger.info('Errors will not be logged because the disable option has been set')
        return
    }

    // Register the server plugin
    if (!options.disableServerSide) {
        /*
        this.addPlugin({
            src: path.resolve(__dirname, 'newrelic.server.js'),
            fileName: 'newrelic.server.js',
            mode: 'server'
        })
        */
        this.nuxt.hook('render:setupMiddleware', app => app.use(requestHandler(app)))
        this.nuxt.hook('render:errorMiddleware', app => app.use(errorHandler(app)))
        this.nuxt.hook('generate:routeFailed', ({ errors }) => {
            errors.forEach(({ error }) => {
                //newrelic.noticeError(error, { 'route': route })
            })
        })
    }

}