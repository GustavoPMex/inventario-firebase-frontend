<template>
    <div class="modal modalfade" id="editarArticulo" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mx-auto" id="editarArticuloLabel">Actualizar</h5>
                </div>
            <div class="modal-body">
                <form @submit.prevent='editarArticulo'>
                    <InputsInventario :articulo="articulo"/>

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
import InputsInventario from '../inventario/InputsInventario.vue'
import {useStore} from 'vuex'
import { computed } from '@vue/reactivity'
import  {useRouter} from 'vue-router'

export default {
    components: {
        InputsInventario
    },
    setup() {
        const store = useStore()

        // Obtenemos lo que actualmente está almacenado en el state
        const articulo = computed(() =>{
            return store.getters.getArticulo
        })

        // Si los campos son validos, se activa el botón
        const btnIsDisabled = computed(() => {
            const articuloValid = articulo.value
            if( articuloValid.nombre && 
                Object.entries(articuloValid.categoria).length && 
                articuloValid.descripcion && articuloValid.proveedor && 
                articuloValid.precio && articuloValid.cantidad){
                return false
            }
            return true
        })
        
        // Limpiamos las propiedades de "Articulo" para dejarlos vacíos nuevamente
        const limpiarInputs = () => {
            store.dispatch('eliminarArticuloAlmacenado')
        }

        // Llamamos a la acción para modificar el articulo actual
        const editarArticulo = () => {
            store.dispatch('actualizarArticulo', articulo.value)
            .then(() => {
                limpiarInputs()
                $('#editarArticulo').modal('toggle')
            })
        }


        return {
            articulo, btnIsDisabled, 
            limpiarInputs, editarArticulo
        }
    },
    watch: {
        $route (to, from){
            this.limpiarInputs()
        }
    }
}
</script>
