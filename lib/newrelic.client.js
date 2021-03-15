import Vue from 'vue'

export default {  
    install (Vue, options) {   
         Vue.mixin({      
            created: function () {
                console.log(`${this.$options.name} this component created`)
              }    
        })  
    }
}