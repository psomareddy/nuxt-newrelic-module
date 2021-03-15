const path = require('path')
const deepMerge = require('deepmerge')
const newrelic = require('newrelic')
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
        logger.info('Errors will not be logged because the disable option has been set')
        return
    }

    if (!options.disableClientSide) {

    }
    this.addPlugin({
        src: path.resolve(__dirname, './lib/newrelic.client.js'),
        fileName: 'newrelic/plugin.client.js',
        mode: 'client'
    })

    // Register the server plugin
    if (!options.disableServerSide) {

        this.nuxt.hook('render:setupMiddleware', app => app.use(requestHandler(app)))
        this.nuxt.hook('render:errorMiddleware', app => app.use(errorHandler(app)))
        this.nuxt.hook('generate:routeFailed', ({ route, errors }) => {
            errors.forEach(({ error }) => {
                newrelic.noticeError(error, { 'route': route })
            })
        })
    }
}

module.exports.meta = require('../package.json')