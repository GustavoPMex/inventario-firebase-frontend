<template>
<div v-if="personalAlmacenado.length" class="row w-100 mx-auto justify-content-center">
    <div class="row w-100 mx-auto mb-5 justify-content-center">
        <div class="col-12 col-lg-5  mt-5 mt-lg-2 text-center">
            <div class="input-group text-center">
                <input 
                    type="search" 
                    class="form-control" 
                    placeholder="Ingresa técnico" 
                    name="search"
                    v-model.trim="busqueda"
                >
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondary btn-search" 
                        type="submit"
                        @click="busquedaPersona(busqueda)"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div v-if="personal.length" class="row w-100 mb-5 mx-auto table-responsive table-overflow">
    <table class="table table-striped table-dark">
        <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Email</th>
            <th scope="col">Dirección</th>
            <th scope="col">Telefono</th>
            <th scope="col">Acción</th>
        </tr>
        </thead>
        <tbody
            v-for="(persona, index) in personal"
            :key="index"
        >
            <tr
            >
                <td class="cuadro-tab-size" >{{persona.usuario}}</td>
                <td class="cuadro-tab-size">
                    <a
                        class="nameArticuloDetail"
                        :href="`mailto:${persona.email}`"
                        role="button"
                    >
                        {{persona.email}}
                    </a>
                </td>
                <td class="cuadro-ta-tab-size">{{persona.direccion}}</td>
                <td>{{persona.telefono}}</td>
                <td>
                    <a
                        role="button"
                        @click="eliminar(persona)"
                    >
                        <i class="fas fa-trash-alt icon-table-del"> </i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<div v-else class="row  w-100  div-vacio">
    <p  class="p-vacia">Sin personal</p>
</div>


</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import swal from 'sweetalert'
import { onMounted } from '@vue/runtime-core'

export default {
    data(){
        return{
            busqueda: ''
        }
    },
    setup(){
        const store = useStore()

        const personalAlmacenado = computed(() =>{
            return store.getters.getPersonal
        })

        const personal = computed(() =>{
            return store.getters.getPersonalFiltrados
        })

        const cargarPersonal = () =>{
            store.dispatch('establecerPersonal')
        }

        const eliminar = (persona) =>{
            swal({
                text: `¿Eliminar ${persona.usuario}?`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((willDelete) => {
                if (willDelete){
                    store.dispatch('eliminarUsuario', persona.id)
                }
            })
        }

        const busquedaPersona = (busqueda) =>{
            store.dispatch('busquedaPersonal', busqueda)
        }

        onMounted(() =>{
            cargarPersonal()
            busquedaPersona()
        })

        return {
            personal, personalAlmacenado,
            eliminar, busquedaPersona
        }
    },
    watch: {
        busqueda: function(){
            if (this.busqueda === '') {
                this.busquedaPersona()
            }
        }
    }

}
</script>

<style>

</style>