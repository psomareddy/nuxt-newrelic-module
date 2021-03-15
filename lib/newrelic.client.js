import Vue from 'vue'

export default (context, inject) => {
    context.app.router.beforeEach((route, from, next) => {
        console.log("routing name is " + route.name)
        next()
    })
    Vue.mixin({
        created: function () {
            console.log(`${this.$options.name} this component created`)
        }
    })
}