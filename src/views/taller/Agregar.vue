<template>
    <form @submit.prevent="nuevoServicio">
        <InputsInventario :servicio='servicio'/>
        <button 
            type="submit" 
            class="btn btn-success btn-form"
        >
            Crear
        </button>
    </form>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import InputsInventario from '../../components/taller/InputsTaller.vue'
import { useRouter } from 'vue-router'

export default {
    components: {
        InputsInventario
    },
    setup(){
        const store = useStore()
        const router = useRouter()

        const servicio = computed(() =>{
            return store.getters.getServicio
        })

        const nuevoServicio = () =>{
            store.dispatch('nuevoServicioTaller')
            .then(() =>{
                limpiarInputs()
                router.push({name: 'TallerPendientes'})
            })
            
        }

        const limpiarInputs = () =>{
            store.dispatch('eliminarServicioTemporal')
        }

        return {
            servicio,
            nuevoServicio
        }
    }
}
</script>

<style>

</style>