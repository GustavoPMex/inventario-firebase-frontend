<template>
<div v-if="proveedoresAlmacenados.length" class="row w-100 mx-auto justify-content-center">
    <div class="row w-100 mx-auto mb-5 justify-content-center">
        <div class="col-12 col-lg-5  mt-5 mt-lg-2 text-center">
            <div class="input-group text-center">
                <input 
                    type="search" 
                    class="form-control" 
                    placeholder="Ingresa proveedor" 
                    name="search"
                    v-model.trim="busqueda"
                    
                >
                <div class="input-group-append">
                    <button 
                        class="btn btn-outline-secondary btn-search" 
                        type="submit"
                        @click="buscarProveedor(busqueda)"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div v-if="proveedores.length" class="row w-100 mb-5 mx-auto table-responsive table-overflow">
    <table class="table table-striped table-dark ">
        <thead>
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Dirección</th>
            <th scope="col">Teléfono</th>
            <th scope="col">Correo</th>
            <th scope="col">Notas</th>
            <th scope="col">Accion</th>
            </tr>
        </thead>
        <tbody 
            v-for="(proveedor, index) in proveedores"
            :key="index"
        >
            <tr>
            <td class="table-wordbreak cuadro-tab-size"> {{proveedor.nombre}} </td>
            <td class="table-wordbreak cuadro-ta-tab-size"> {{proveedor.direccion}} </td>
            <td class="cuadro-tab-size">
                <a
                    class="nameArticuloDetail"
                    :href="`tel:${proveedor.telefono}`"
                    role="button"
                >
                    {{proveedor.telefono}}
                </a>
            </td> 

            <td v-if="proveedor.correo" class="table-wordbreak cuadro-tab-size">
                <a
                    class="nameArticuloDetail"
                    :href="`mailto:${proveedor.correo}`"
                    role="button"
                >
                    {{proveedor.correo}}
                </a>
            </td>
            <td v-else class="vacio"> Vacío </td>

            <td v-if="proveedor.notaAdicional" class="table-wordbreak cuadro-ta-tab-size">
                {{proveedor.notaAdicional}}
            </td>
            <td class="vacio" v-else>Vacío</td>
            <td>
                <a  
                    data-toggle="modal" 
                    data-target="#editarProveedor" 
                    data-whatever="@getbootstrap"
                    data-backdrop="static" data-keyboard="false"
                    role="button"
                    @click="establecerProveedor(proveedor)"
                >
                    <i class="fas fa-pen-square icon-table-up"></i>
                </a>
                <modalProveedor />
                <a 
                    role="button"
                    @click="eliminarProvee(proveedor)"
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
import modalProveedor from '../../components/proveedores/ModalProveedor.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    data() {
        return{
            busqueda: ''
        }
    },
    components: {
        modalProveedor
    },
    setup() {
        const store = useStore()

        const proveedoresAlmacenados = computed(() =>{
            return store.getters.getProveedores
        })

        const proveedores = computed(() =>{
            return store.getters.getProveedoresFiltrados
        })

        const establecerProveedor = (proveedor) =>{
            const proveedorEstablecido = JSON.parse(JSON.stringify(proveedor))
            store.dispatch('establecerProveedorTemporal', proveedorEstablecido)
        }

        const eliminarProvee = (proveedor) =>{
            swal({
                text: `¿Eliminar ${proveedor.nombre}?`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
            .then((willDelete) => {
                if (willDelete){
                    store.dispatch('eliminarProveedor', proveedor.id)
                }
            })
        }

        const buscarProveedor = (busqueda) =>{
            store.dispatch('busquedaProveedor', busqueda)
        }

        return {
            proveedores,proveedoresAlmacenados,
            establecerProveedor, eliminarProvee, buscarProveedor,
        }
    },
    watch: {
        busqueda: function(){
            if (this.busqueda === ''){
                this.buscarProveedor()
            }
        }
    },
}
</script>

