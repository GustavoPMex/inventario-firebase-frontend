<template>
  <component :is="layout"></component>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import LoginLayout from './components/layouts/Login.vue'
import PrincipalLayout from './components/layouts/Principal.vue'

export default {
    components: {
      LoginLayout, PrincipalLayout
    },
    setup(){
        const store = useStore()
      
        const layout = computed(() =>{
            return store.getters.getLayout
        })

      return {
        layout,
      }
    }
}
</script>
