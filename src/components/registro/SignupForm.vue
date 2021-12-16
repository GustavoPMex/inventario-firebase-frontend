<template>
    <div class="content-form mx-auto">
        <h1 class="h1-registration mb-4">Registro</h1>
        <form @submit.prevent="nuevoUsuario">
            <div class="form-group">
                <label class="label-registration" for="">Foto</label>
                <input type="file" name="avatar" class="form-control" id="id_avatar">
            </div>

            <div class="form-group">
                <label class="label-registration" for="">Nombre</label>
                <input 
                    class="form-control" 
                    type="text"
                    placeholder="Ingrese Nombre"
                    v-model="camposUsuario.nombre"
                >
            </div>            
            
            <div class="form-group">
                <label class="label-registration" for="">Correo</label>
                <input 
                    class="form-control"
                    type="email"
                    placeholder="Ingrese correo"
                    v-model="camposUsuario.email"
                >
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

            <div class="form-group">
                <label class="label-registration" for="">Contraseña</label>
                <input 
                    class="form-control"
                    type="password"
                    placeholder="Ingrese contraseña"
                    v-model="camposUsuario.contrasenaUno"
                >
            </div>
            

            <div class="form-group">
                <label class="label-registration" for="">Confirmar contraseña</label>
                <input 
                    class="form-control"
                    type="password"
                    placeholder="Ingrese contraseña nuevamente"
                    v-model="camposUsuario.contrasenaDos"
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
import swal from 'sweetalert'
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
                usuario.direccion && usuario.telefono.length > 6 &&
                usuario.contrasenaUno > 5 &&
                usuario.contrasenaDos === usuario.contrasenaUno) {
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