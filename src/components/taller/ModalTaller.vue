<template>
    <div class="modal modalfade" id="editarPendiente" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editarArticuloLabel">Actualizar</h5>
                </div>
            <div class="modal-body">
                <form @submit.prevent="actualizar">

                    <InputsTaller :servicio="servicio"/>

                    <button 
                        :disabled="btnDisabled"
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
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import InputsTaller from '../../components/taller/InputsTaller.vue'

export default {
    components: {
        InputsTaller
    },
    setup() {
        const store = useStore()

        const servicio = computed(() =>{
            return store.getters.getServicio
        })

        const limpiarInputs = () =>{
            store.dispatch('eliminarServicioTemporal')
        }

        const actualizar = () =>{
            store.dispatch('actualizarServicioTaller')
            $('#editarPendiente').modal('toggle')
            limpiarInputs()
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

        return {
            servicio, btnDisabled,
            limpiarInputs, actualizar
        }
    },
    watch: {
        $route(to, from){
            this.limpiarInputs()
        }
    }
}
</script>