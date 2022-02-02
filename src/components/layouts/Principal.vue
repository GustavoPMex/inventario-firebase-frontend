<template>
    <Menu />
    <router-view/>
</template>

<script>
import { useStore } from 'vuex';
import Menu from '../Menu.vue'
import { onMounted } from '@vue/runtime-core';

export default {
    components: {
        Menu
    },
    setup(){
        const store = useStore()

        onMounted(async() => {
            await store.dispatch('setLayout', 'principal-layout')
            await store.dispatch('establecerInicio')
            // Proveedores
            await store.dispatch('establecerProveedores')
            await store.dispatch('busquedaProveedor')
            // Inventario
            await store.dispatch('establecerArticulos')
            await store.dispatch('establecerArticulosFiltrados', {categorias: [], proveedores: []})
            await store.dispatch('establecerCategorias')
            // Clientes
            await store.dispatch('establecerClientes')
            await store.dispatch('busquedaCliente')
            // Taller
            await store.dispatch('establecerTallerServicios')
            await store.dispatch('busquedaServicioTaller',{'tecnicos': [], 'tipos': [], 'estado': []})
            // Personal
            await store.dispatch('establecerPersonal')
            await store.dispatch('busquedaPersonal')


        })

        return {
            
        }
    },
    beforeCreate(){
        document.body.classList.remove('registrobody');
    }

}
</script>
