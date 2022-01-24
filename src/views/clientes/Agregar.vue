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

export default {
    components: {
        InputsClientes
    },
    setup() {
        const store = useStore()

        const cliente = computed(() =>{
            return store.getters.getCliente
        })

        const agregarCliente = () =>{
            store.dispatch('nuevoCliente')
        }

        const disabledBtn = computed(() =>{
            const nuevoCliente = cliente.value
            if (nuevoCliente.nombre && nuevoCliente.telefono.toString().length > 6 &&
                nuevoCliente.correo.length === 0 ||
                nuevoCliente.correo.includes('@') && nuevoCliente.correo.includes('.com')) {
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

