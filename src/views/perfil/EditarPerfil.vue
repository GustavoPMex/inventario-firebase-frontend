<template>

<form @submit.prevent="actualizarPerfil">
    <div class="form-group">
        <label class="label-registration" for="">Foto</label>
        <input type="file" name="avatar" class="form-control" id="id_avatar">
    </div>           

    <div class="form-group">
        <label class="label-registration" for="">Dirección</label>
        <textarea 
            class='form-control' 
            rows="5"
            placeholder = 'Ingrese dirección' 
            v-model="camposUsuario.direccion"
        >
        </textarea>
    </div>

    <div class="form-group">
        <label class="label-registration" for="">Teléfono</label>
        <input 
            class="form-control"
            type="tel"
            placeholder="Ingrese teléfono"
            v-model="camposUsuario.telefono"
        >
    </div>
    
    <button 
        type="submit" 
        class="btn btn-success mt-5 btn-registration"
        :disabled='btnDisabled'
    >   Guardar
    </button>
</form>
<router-link 
        :to="{name: 'Perfil'}"
        class="btn btn-danger mt-3"
>
Cancelar
</router-link>

</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'

export default {
    setup(){
        const store = useStore()
        const router = useRouter()

        const camposUsuario = computed(() =>{
            return store.getters.getSesionActual
        })

        const btnDisabled = computed(() =>{
            const usuario = camposUsuario.value
            if (usuario.direccion && usuario.telefono.length > 9) {
                return false
            } else {
                return true
            }
        })

        const establecerDatosPerfil = () =>{
            store.dispatch('establecerPerfilActual')
        }

        const actualizarPerfil = () => {
            store.dispatch('actualizarPerfil')
            limpiarInputs()
            router.push({name: 'Perfil'})
        }

        const limpiarInputs = () =>{
            store.dispatch('eliminarPerfilActualTemporal')
        }

        onMounted(() => {
            establecerDatosPerfil()
        })

        return {
            camposUsuario, btnDisabled,
            actualizarPerfil, limpiarInputs
        }
    },
    watch: {
        $route (to, from){
            this.limpiarInputs()
        }
    },
    created(){
        window.scrollTo(0, 0);
    }
}
</script>

<style>

</style>