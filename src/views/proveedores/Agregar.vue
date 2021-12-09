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
import { useRouter } from 'vue-router'

export default {
    components: {
        InputsProveedores,
    },
    setup(){
        const store = useStore()
        const router = useRouter()

        const proveedor = computed(() =>{
            return store.getters.getProveedor
        })

        const proveedores = computed(() => {
            return store.getters.getProveedores
        })

        const btnIsDisabled = computed(() =>{
            const proveedorNuevo = proveedor.value
            if (proveedorNuevo.nombre && proveedorNuevo.direccion &&
                proveedorNuevo.telefono.length > 9){
                    return false
            }
            return true
        })

        const limpiarProveedor = () =>{
            store.dispatch('eliminarProveedorTemporal')
        }

        const agregarNuevoProveedor = () =>{
            store.dispatch('nuevoProveedor')
            .then(() => {
                router.push({name: 'ProveedoresList'})
                limpiarProveedor()
            })
        }

        return {
            btnIsDisabled, proveedor, proveedores,
            agregarNuevoProveedor
        }
    }
}
</script>

