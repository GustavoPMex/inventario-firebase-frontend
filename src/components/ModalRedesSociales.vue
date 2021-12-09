<template>
    <div class="modal modalfade" id="modalRedes"  tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalRedesLabel">Redes sociales</h5>
                </div>
            <div class="modal-body">
                <p>Ej: https://www.facebook.com/... </p>
                <form @submit.prevent='actualizarRedes'>
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            id="recipient-name"
                            placeholder="Facebook"
                            v-model="redes.facebook"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            id="recipient-name"
                            placeholder="Twitter"
                            v-model="redes.twitter"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-control" 
                            id="recipient-name"
                            placeholder="Instagram"
                            v-model="redes.instagram"
                        >
                    </div>

                    <transition name="bounce">
                        <div v-if="errores.length" class="alert alert-danger" role="alert">
                            <p
                                v-for="(error, index) in errores"
                                :key="index"
                            >- {{error}}</p>

                        </div>
                    </transition>

                    <button
                        class="btn btn-success"
                        @click="limpiarErrores"
                        :disabled='btnDisabled'
                    >
                        Guardar
                    </button>
                </form>

            </div>
            <div class="modal-footer">
                <button 
                    type="button" 
                    class="btn btn-secondary mx-auto"
                    data-dismiss="modal"
                    @click="limpiarErrores"
                >
                    Cerrar
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    setup(){

        const store = useStore()
        
        // Los errores que usaremos en el formulario
        let errores = ref([])

        const redesAlmacenadas = computed(() =>{
            return store.getters.getRedesSociales
        })

        // Obtenemos las redes sociales que tenemos actualmente almacenadas
        const redes = computed(() => {
            return store.getters.getRedesTemporales
        })

        // El boton estará desactivado en caso de que el valor en el formulario
        // sea igual a lo que tenemos almacenado actualmente
        const btnDisabled = computed(() => {
            const redesActuales = redesAlmacenadas.value
            if( redesActuales.facebook === redes.value.facebook &&
                    redesActuales.twitter === redes.value.twitter &&
                    redesActuales.instagram === redes.value.instagram ){
                        return true
                }
                return false
        })

        // Limpiar los errores para que no se almacenen
        const limpiarErrores = () =>{
            errores.value = []
        }

        // El procesamiento del formulario de redes sociales
        const actualizarRedes = () => {
            
            // Función para comprobar que la red social sea valida.
            // En éste caso comprobamos que tenga la url del dominio perteneciente
            // a su red social. Igual se permiten campos vacíos
            function validarUrl(red) {
                const nombreRed = red.key
                const urlRed = red.value
                return  urlRed.includes(`https://www.${nombreRed}.com/`) ||
                        urlRed === '' ? true : false 
            }
            
            // Guardamos en una constante las redes sociales que se pasaron a través formulario 
            const redesSociales = redes.value
            // Realizamos la validacion de cada red social
            Object.entries(redesSociales).forEach(([nombre, url]) => {
                // Creamos un objeto temporal que almacenará el nombre y la url
                const redActual = {
                    key: nombre,
                    value: url
                }
                // Si la red social retorna false, entonces lo añadimos a los errores
                if (!validarUrl(redActual)){
                    errores.value.push(`Link de ${redActual.key} inválido`)
                }
            })

            if (!errores.value.length){
                store.dispatch('nuevasRedesSociales', redes.value)
                $('#modalRedes').modal('toggle')
            }
        }

        return {redes, btnDisabled, errores, limpiarErrores, actualizarRedes}
    }
}
</script>