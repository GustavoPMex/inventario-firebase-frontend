<template>
    <Menu />
    <router-view/>
</template>

<script>
import { useStore } from 'vuex';
import Menu from '../Menu.vue'

export default {
    components: {
        Menu
    },
    setup(){
        const store = useStore()
        
        const establecerLayout = () => {
            store.dispatch('setLayout', 'principal-layout')
        }

        const cargarSesion = () =>{
            store.dispatch('establecerInicio')
        }

        return {
            establecerLayout, cargarSesion
        }
    },
    beforeCreate(){
        this.cargarSesion()
        document.body.classList.remove('registrobody');
    },
    created(){
        this.establecerLayout()
    }
}
</script>
