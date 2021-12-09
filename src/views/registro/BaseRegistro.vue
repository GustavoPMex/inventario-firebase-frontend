<template>
    <router-view> </router-view>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()

        const establecerLayout = () => {
            store.dispatch('setLayout', 'login-layout')
        }

        onMounted(() =>{
            establecerLayout()
        })

        return {
            establecerLayout
        }
    }
}
</script>

<style>

</style>