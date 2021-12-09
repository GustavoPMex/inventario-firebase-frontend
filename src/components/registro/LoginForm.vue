<template>
    <div class="content-form mx-auto">
        <h1 class="h1-registration mb-4">Ingreso</h1>
        <form @submit.prevent="sesion">
            <div class="form-group">
                <label class="label-registration" for="">Usuario</label>
                <input 
                    class="form-control" 
                    type="text"
                    placeholder="Ingrese usuario"
                    v-model="usuario"
                >
            </div>            

            <div class="form-group">
                <label class="label-registration" for="">Contraseña</label>
                <input 
                    class="form-control"
                    type="password"
                    placeholder="Ingrese contraseña"
                    v-model="contrasena"
                >
            </div>

            <button 
                type="submit" 
                class="btn btn-success mt-5 btn-registration"
                :disabled='btnDisabled'
            >
                Entrar
            </button>
        </form>

        <div class="mt-5">
            <p class="p-registration">
                <a href="#" class="link-registration">
                    Cambiar contraseña
                </a>
            </p>
        </div>
        
        <div>
            <p class="p-registration">
                ¿No tienes cuenta? 
                <router-link 
                    :to="{name: 'Signup'}"
                    class="link-registration"
                > 
                    Registrate
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import swal from 'sweetalert'

export default {
    setup(){
        const store = useStore()

        const usuario = ref('')
        const contrasena = ref('')

        const usuarios = computed(() =>{
            return store.getters.getPersonal
        })

        const btnDisabled = computed(() =>{
            if (usuario.value && contrasena.value.length > 5) {
                return false
            } else {
                return true
            }
        })

        const sesion = () =>{
            const listaUsuarios =  usuarios.value
            for(const indexUsuario in listaUsuarios){
                const usuarioActual = listaUsuarios[indexUsuario]
                if (usuarioActual.usuario === usuario.value &&
                    usuarioActual.contrasenaUno === contrasena.value) {
                    store.dispatch('ingresoUsuario', usuarioActual)
                    return
                }
            }
            swal({
                text: 'Usuario o contraseña no válida',
                icon: 'error'
            })

        }
        return {
            usuario, contrasena,
            btnDisabled,
            sesion
        }
    }
}
</script>

<style>

</style>