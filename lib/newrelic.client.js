import Vue from 'vue'

export default function (context, inject) {
    context.app.router.beforeEach((to, from, next) => {
        //
        next()
    })
    context.app.router.afterEach((to, from) => {
        //
    })
    if (!Vue.__newrelic_mixin__) {
        Vue.__newrelic_mixin__ = true
        Vue.mixin({
            created: function () {
                //console.log(`${this.$options.name} component created`)
            },
            head() {
                return {
                    title: 'plugin title',
                    meta: [
                        {
                            hid: 'keywords', name: 'keywords', content: 'plugin kw'
                        },
                        {
                            hid: 'description', name: 'description', content: 'plugin desc'
                        }
                    ]
                }
            }

        })
    }
}