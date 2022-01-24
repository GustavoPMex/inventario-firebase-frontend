<template>
    <div class="content-form mx-auto">
        <h1 class="h1-registration mb-4">Registro</h1>
        <form @submit.prevent="nuevoUsuario">

            <div class="form-group">
                <label class="label-registration" for="">Nombre</label>
                <input 
                    class="form-control" 
                    type="text"
                    placeholder="Ingrese Nombre"
                    v-model.trim="camposUsuario.nombre"
                >
            </div>            
            
            <div class="form-group">
                <label class="label-registration" for="">Correo</label>
                <input 
                    class="form-control"
                    type="email"
                    placeholder="Ingrese correo"
                    v-model.trim="camposUsuario.email"
                >
            </div>

            <div class="form-group">
                <label class="label-registration" for="">Dirección</label>
                <textarea 
                    class='form-control' 
                    rows="5"
                    placeholder = 'Ingrese dirección' 
                    v-model.trim="camposUsuario.direccion"
                >
                </textarea>
            </div>

            <div class="form-group">
                <label class="label-registration" for="">Teléfono</label>
                <input 
                    class="form-control"
                    type="number"
                    placeholder="Ingrese teléfono"
                    v-model="camposUsuario.telefono"
                >
            </div>

            <div class="form-group">
                <label class="label-registration" for="">Contraseña</label>
                <input 
                    class="form-control"
                    type="password"
                    placeholder="Ingrese contraseña"
                    v-model.trim="camposUsuario.passwordUno"
                >
            </div>
            

            <div class="form-group">
                <label class="label-registration" for="">Confirmar contraseña</label>
                <input 
                    class="form-control"
                    type="password"
                    placeholder="Ingrese contraseña nuevamente"
                    v-model.trim="camposUsuario.passwordDos"
                >
            </div>
            
            <button 
                type="submit" 
                class="btn btn-success mt-5 btn-registration"
                :disabled='btnDisabled'
            >   Entrar
            </button>
        </form>

        <div class="mt-5">
            <p class="p-registration">
                ¿Tienes cuenta? 
                <router-link 
                    :to="{name: 'Login'}"
                    class="link-registration"
                > 
                    Ingresa
                </router-link>
            </p>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup(){
        const store = useStore()
        const router = useRouter()

        const camposUsuario = computed(() =>{
            return store.getters.getUsuario
        })

        const btnDisabled = computed(() =>{
            const usuario = camposUsuario.value
            if (usuario.nombre && usuario.email.includes('@') &&
                usuario.direccion && usuario.telefono.toString().length > 6 &&
                usuario.passwordUno > 5 &&
                usuario.passwordDos === usuario.passwordUno) {
                return false
            } else {
                return true
            }
        })

        const nuevoUsuario = () =>{
            store.dispatch('nuevoUsuario')
        }

        return {
            camposUsuario, btnDisabled,
            nuevoUsuario
        }
    }
}
</script>

<style>

</style>