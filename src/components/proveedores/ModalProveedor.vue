<template>
    <div class="modal modalfade" id="editarProveedor" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 
                        class="modal-title mx-auto" 
                        id="editarArticuloLabel"
                    > Actualizar
                    </h5>
                </div>
            <div class="modal-body">
                <form @submit.prevent='actualizarProveedor'>
                    <InputsProveedores :proveedor="proveedor"/>

                    <button 
                        type="submit" 
                        class="btn btn-success btn-form"
                        :disabled='btnIsDisabled'
                    >
                        Actualizar
                    </button>
                </form>
            </div>
            <div class="modal-footer text-center">
                <button 
                    type="button" 
                    class="btn btn-secondary mx-auto" 
                    data-dismiss="modal"
                    @click="limpiarInputs"
                >
                    Cerrar
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputsProveedores from '../proveedores/InputsProveedores.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    components: {
        InputsProveedores
    },
    setup() {
        const store = useStore()

        const proveedor = computed(() =>{
            return store.getters.getProveedor
        })

        const btnIsDisabled = computed(() =>{
            const proveedorNuevo = proveedor.value
            if (proveedorNuevo.nombre.length > 1 && proveedorNuevo.direccion.length > 4 &&
                proveedorNuevo.telefono.length > 6){
                    return false
            }
            return true
        })

        const limpiarInputs = () =>{
            store.dispatch('eliminarProveedorTemporal')
        }
        
        const actualizarProveedor = () =>{
            store.dispatch('actualizarProveedor')
            .then(() => {
                limpiarInputs()
                $('#editarProveedor').modal('toggle')
            })
        }

        return {
            proveedor, btnIsDisabled,
            actualizarProveedor, limpiarInputs,
        }
    },
    watch:{
        $route (to, from){
            this.limpiarInputs()
        }
    }
}
</script>