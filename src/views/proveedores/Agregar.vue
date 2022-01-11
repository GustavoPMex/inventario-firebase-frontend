<template>
    <form @submit.prevent="agregarNuevoProveedor">
        <InputsProveedores :proveedor='proveedor'/>

        <button 
            type="submit" 
            class="btn btn-success btn-form"
            :disabled="btnIsDisabled"
        >
            Crear
        </button>
    </form>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import InputsProveedores from '../../components/proveedores/InputsProveedores.vue'

export default {
    components: {
        InputsProveedores,
    },
    setup(){
        const store = useStore()

        const proveedor = computed(() =>{
            return store.getters.getProveedor
        })

        const proveedores = computed(() => {
            return store.getters.getProveedores
        })

        const btnIsDisabled = computed(() =>{
            const proveedorNuevo = proveedor.value
            if (proveedorNuevo.nombre.length > 1 && proveedorNuevo.direccion.length > 4 &&
                proveedorNuevo.telefono.length > 6){
                    return false
            }
            return true
        })

        const agregarNuevoProveedor = () =>{
            store.dispatch('nuevoProveedor')
        }

        return {
            btnIsDisabled, proveedor, proveedores,
            agregarNuevoProveedor
        }
    }
}
</script>

