import Vue from 'vue'

export default function (context, inject) {
    console.log("newrelic.client.js called")
    context.app.router.beforeEach((route, from, next) => {
        console.log("routing name is " + route.name)
        next()
    })
    Vue.mixin({
        created: function () {
            if (process.client) {
                console.log(`${this.$options.name} client component created`)
            } else {
                console.log(`${this.$options.name} server component created`)
            }
        }
    })
}