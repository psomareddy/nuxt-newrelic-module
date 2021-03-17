const newrelic = require('newrelic')
import Vue from 'vue'

export default function (context, inject) {
    if (!Vue.__newrelic_mixin__) {
        Vue.__newrelic_mixin__ = true
        Vue.mixin({
            created: newrelic.startSegment("createComponent", true, function handler (cb) {
                console.log(`${this.$options.name} component created`)
            }
        })
    }
}