const newrelic = require('newrelic')
import Vue from 'vue'

export default function (context, inject) {
    if (!Vue.__newrelic_mixin__) {
        Vue.__newrelic_mixin__ = true
        Vue.mixin({
            //dont use lambda function because `this` will not work in lambdas
            created: function () {
                console.log(`${this.$options.name} component created`)
            }
        })
    }
}