import Vue from 'vue'

export default function (context, inject) {
    console.log("newrelic.client.js called")
    context.app.router.beforeEach((to, from, next) => {
        console.log("routing name is " + to.name)
        next()
    })
    context.app.router.afterEach((to, from) => {
        console.log("routing name is " + to.name)
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