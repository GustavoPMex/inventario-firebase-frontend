<template>
    <form @submit.prevent="nuevoServicio">
        <InputsInventario :servicio='servicio'/>
        <button 
            :disabled="btnDisabled"
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
                router.push({name: 'TallerList'})
            })
            
        }

        const btnDisabled = computed(() =>{
            const servicioActual = servicio.value
            if (Object.entries(servicioActual.cliente).length &&
                Object.entries(servicioActual.tecnico).length &&
                servicioActual.servicio && servicioActual.tipo &&
                servicioActual.descripcion && servicioActual.estado){
                return false
            } else {
                return true
            }
        })

        const limpiarInputs = () =>{
            store.dispatch('eliminarServicioTemporal')
        }

        return {
            servicio, btnDisabled,
            nuevoServicio
        }
    }
}
</script>

<style>

</style>