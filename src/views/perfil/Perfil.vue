<template>
<div class="row w-100 mx-auto justify-content-center">
    <div class="perfil-bg">
        <img class="perfil-photo" src="/assets/default_photo.jpg">
    </div>

    <div class="perfil-text">
        <p class="perfil-title">Usuario</p>
        <p class="perfil-p">{{usuarioActual.nombre}}</p>

        <p class="perfil-title">Correo</p>
        <p class="perfil-p">{{usuarioActual.email}}</p>

        <p class="perfil-title">Dirección</p>
        <p class="perfil-p">{{usuarioActual.direccion}}</p>

        <p class="perfil-title">Telefono</p>
        <p class="perfil-p">{{usuarioActual.telefono}}</p>
    </div>
</div>

<div class="mt-5 content-btn">
    <router-link 
        :to="{name: 'ActualizarPerfil'}"
        class="perfil-btn btn btn-success"
    >
        Editar
    </router-link>
    <a class="perfil-btn btn btn-danger"
        role="button"
        @click="eliminarSesion"
    >Cerrar sesión</a>
</div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()

        const usuarioActual = computed(() =>{
            return store.getters.getSesionActual
        })

        const eliminarSesion = () =>{
            store.dispatch('cerrarSession')
        }

        return {
            usuarioActual,
            eliminarSesion,
        }
    }
}
</script>

<style>

</style>