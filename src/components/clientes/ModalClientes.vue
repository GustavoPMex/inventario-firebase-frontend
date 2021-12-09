<template>
    <div class="modal modalfade" id="editarCliente" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarArticuloLabel">Actualizar</h5>
                </div>
            <div class="modal-body">
                <form @submit.prevent='actualizar'>
                    <InputsClientes :cliente="cliente"/>

                    <button 
                        type="submit" 
                        class="btn btn-success btn-form"
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
import InputsClientes from './InputsClientes.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    components: {
        InputsClientes
    },

    setup() {
        const store = useStore()

        const cliente = computed(() =>{
            return store.getters.getCliente
        })

        const limpiarInputs = () =>{
            store.dispatch('eliminarClienteTemporal')
        }

        const actualizar = () =>{
            store.dispatch('actualizarCliente')
            .then(() => {
                limpiarInputs()
                $('#editarCliente').modal('toggle')
            })
        }

        return {
            cliente,
            limpiarInputs, actualizar
        }
    },
    watch:{
        $route (to, from){
            this.limpiarInputs()
        }
    }
}
</script>