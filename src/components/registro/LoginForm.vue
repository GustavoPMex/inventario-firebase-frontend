<template>
    <div class="content-form mx-auto">
        <h1 class="h1-registration mb-4">Ingreso</h1>
        <form @submit.prevent="sesion">
            <div class="form-group">
                <label class="label-registration" for="">Correo electrónico</label>
                <input 
                    class="form-control" 
                    type="email"
                    placeholder="Ingrese correo"
                    v-model.trim="email"
                >
            </div>            

            <div class="form-group">
                <label class="label-registration" for="">Contraseña</label>
                <input 
                    class="form-control"
                    type="password"
                    placeholder="Ingrese contraseña"
                    v-model.trim="password"
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

export default {
    setup(){
        const store = useStore()

        const email = ref('')
        const password = ref('')

        const btnDisabled = computed(() =>{
            if (email.value && password.value.length > 5) {
                return false
            } else {
                return true
            }
        })

        const sesion = () =>{
            const usuarioLogin = {
                correo: email.value,
                password: password.value
            }
            store.dispatch('ingresoUsuario', usuarioLogin)
        }

        return {
            email, password,
            btnDisabled,
            sesion
        }
    }
}
</script>

<style>

</style>