const newrelic = require('newrelic')
import Vue from 'vue'
const util = require('util')

export default function (context, inject) {
    if (!Vue.__newrelic_mixin__) {
        Vue.__newrelic_mixin__ = true
        Vue.mixin({
            //dont use lambda function because as arrow functions do not have `this` variable
            beforeCreate: function() {
                console.log(`About to create ${this.$options.name} component`)
                newrelic.setTransactionName("hello")
                const transaction = newrelic.getTransaction();
                console.log(util.inspect(transaction, {showHidden: false, depth: 1}))
            },
            created: function () {
                console.log(`${this.$options.name} component created`)
            }
        })
    }
}