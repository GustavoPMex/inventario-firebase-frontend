<template>
    <form @submit.prevent="agregarCliente">
        <InputsClientes :cliente='cliente' />
        <button 
            type="submit" 
            class="btn btn-success btn-form"
            :disabled='disabledBtn'
        >
            Crear
        </button>
    </form>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import InputsClientes from '../../components/clientes/InputsClientes.vue'
import { useRouter } from 'vue-router'

export default {
    components: {
        InputsClientes
    },
    setup() {
        const store = useStore()
        const router = useRouter()

        const cliente = computed(() =>{
            return store.getters.getCliente
        })
        
        const eliminarTemporal = () =>{
            store.dispatch('eliminarClienteTemporal')
        }

        const agregarCliente = () =>{
            store.dispatch('nuevoCliente')
            eliminarTemporal()
            router.push({name: 'ClientesList'})
        }

        const disabledBtn = computed(() =>{
            const nuevoCliente = cliente.value
            if (nuevoCliente.nombre && nuevoCliente.descripcion &&
                nuevoCliente.telefono.length > 9) {
                return false
            } else {
                return true
            }
        })

        return {
            cliente, disabledBtn, agregarCliente
        }
    }
}
</script>

