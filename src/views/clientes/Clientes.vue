<template>
<div v-if="clientesAlmacenados.length" class="row w-100 mx-auto justify-content-center">
    <div class="row w-100 mx-auto mb-5 justify-content-center">
        <div class="col-12 col-lg-5  mt-5 mt-lg-2 text-center">
            <div class="input-group text-center">
                <input 
                    type="search" 
                    class="form-control" 
                    placeholder="Ingresa cliente" 
                    name="search"
                    v-model.trim="busqueda"
                >
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondary btn-search" 
                        type="submit"
                        @click="buscarCliente(busqueda)"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div v-if="clientes.length" class="row w-100 mb-5 mx-auto table-responsive table-overflow">
    <table class="table table-striped table-dark ">
        <thead>
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Correo</th>
            <th scope="col">Accion</th>
            </tr>
        </thead>
        <tbody 
            v-for="(cliente, index) in clientes"
            :key="index"
        >
            <tr>
                <td class="table-wordbreak cuadro-tab-size"> {{cliente.nombre}} </td>
                <td class="table-wordbreak cuadro-ta-tab-size"> {{cliente.descripcion}} </td>
                <td class="cuadro-tab-size">
                    <a
                        class="nameArticuloDetail"
                        :href="`tel:${cliente.telefono}`"
                        role="button"
                    >
                        {{cliente.telefono}}
                    </a>
                </td> 
                <td v-if="cliente.correo" class="table-wordbreak cuadro-tab-size">
                    <a
                        class="nameArticuloDetail"
                        :href="`mailto:${cliente.correo}`"
                        role="button"
                    >
                        {{cliente.correo}}
                    </a>
                </td>
                <td v-else class="table-wordbreak cuadro-tab-size vacio"> Vacío </td>
                <td>
                    <a  
                        data-toggle="modal" 
                        data-target="#editarCliente" 
                        data-whatever="@getbootstrap"
                        data-backdrop="static" data-keyboard="false"
                        role="button"
                        @click="establecerCliente(cliente)"
                    >
                        <i class="fas fa-pen-square icon-table-up"></i>
                    </a>
                    <ModalClientes />
                    <a 
                        role="button"
                        @click="eliminar(cliente)"
                    >
                        <i class="fas fa-trash-alt icon-table-del"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
    
</div>

<div v-else class="row w-100 div-vacio">
    <p class="p-vacia">Sin Proveedores</p>
</div>

</template>

<script>
import ModalClientes from '../../components/clientes/ModalClientes.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import swal from 'sweetalert'


export default {
    data(){
        return{
            busqueda: ''
        }
    },
    components:{
        ModalClientes
    },
    setup() {
        const store = useStore()

        const clientesAlmacenados = computed(()=>{
            return store.getters.getClientes
        })

        const clientes = computed(() =>{
            return store.getters.getClientesFiltrados
        })

        const cargarClientes = () =>{
            store.dispatch('establecerClientes')
        }

        const establecerCliente = (cliente) => {
            const clienteActual = JSON.parse(JSON.stringify(cliente))
            store.dispatch('establecerClienteTemporal', clienteActual)
        }

        const eliminar = (cliente) =>{
            swal({
                title: `¿Eliminar ${cliente.nombre}?`,
                icon: 'warning',
                buttons: true,
                dangerMode: true
            })
            .then((willDelete) =>{
                if(willDelete){
                    store.dispatch('eliminarCliente', cliente.id)
                }
            })
        }

        const buscarCliente = (busqueda) =>{
            store.dispatch('busquedaCliente', busqueda)
        }

        onMounted(() =>{
            cargarClientes()
            buscarCliente()
        })


        return {
            clientes, clientesAlmacenados,
            establecerCliente, eliminar, buscarCliente
        }
    },
    watch:{
        busqueda: function(){
            if(this.busqueda === ''){
                this.buscarCliente()
            }
        }
    }

}
</script>

