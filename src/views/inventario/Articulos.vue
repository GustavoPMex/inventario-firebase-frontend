<template>
<div v-if="articulosAlmacenados.length" class="row w-100 mx-auto mb-5 justify-content-center">
    <div class="col-12 col-lg-3  mt-4 mt-lg-2 text-center">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Categorias
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div 
                            v-for="(categoria, index) in categorias"
                            :key="index"
                            class="form-check"
                        >
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                :value="categoria.id" 
                                :id="`checkCategoria${categoria.id}`"
                                v-model="filtroCategoria"
                                @change="configurarArticulos"
                            >

                            <label class="form-check-label" :for="`checkCategoria${categoria.id}`">
                                {{categoria.nombre}}
                            </label>
                        </div>
                </div>
            </div>
    </div>

    <div class="col-12 col-lg-3  mt-4 mt-lg-2 text-center">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Proveedores
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div 
                            v-for="(proveedor, index) in proveedores"
                            :key="index"
                            class="form-check"
                        >
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                :value="proveedor.id" 
                                :id="`checkProveedor${proveedor.id}`"
                                v-model="filtroProveedor"
                                @change="configurarArticulos"
                            >

                            <label class="form-check-label" :for="`checkProveedor${proveedor.id}`">
                                {{proveedor.nombre}}
                            </label>
                        </div>
                </div>
            </div>
    </div>
</div>

<div v-if="articulos.length" class="row w-100 mb-5 mx-auto table-responsive table-overflow">

    <table class="table table-striped table-dark ">
        <thead>
            <tr>
            <th scope="col">Articulo</th>
            <th scope="col">Categoria</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Accion</th>
            </tr>
        </thead>
        <tbody 
            v-for="(articulo, index) in articulos"
            :key="index"
        >
            <tr>
            <td class="table-wordbreak">
                <a
                    class="nameArticuloDetail cuadro-tab-size"
                    data-toggle="modal" 
                    data-target="#articuloDetalles" 
                    data-whatever="@getbootstrap"
                    data-backdrop="static" data-keyboard="false"
                    role="button"
                    @click="configurarArticulo(articulo)"
                >
                    {{articulo.nombre}}
                </a>
                <ModalArticulo/>
            </td>
            <td class="cuadro-tab-size">{{articulo.categoria.nombre}}</td>
            <td class="cuadro-tab-size">{{articulo.proveedor.nombre}}</td> 
            <td class="cuadro-tab-size">$ {{ formatoPrecio(articulo.precio) }}</td>
            <td>{{articulo.cantidad}}</td>
            <td>
                <a  
                    data-toggle="modal" 
                    data-target="#editarArticulo" 
                    data-whatever="@getbootstrap"
                    data-backdrop="static" data-keyboard="false"
                    @click="configurarArticulo(articulo)"
                    role="button"
                >
                    <i class="fas fa-pen-square icon-table-up"></i>
                </a>
                <ModalInventario />
                <a 
                    @click="eliminarArti(articulo)"
                    role="button"
                >
                    <i class="fas fa-trash-alt icon-table-del"></i>
                </a>
            </td>
            </tr>
        </tbody>
    </table>
    
</div>

<div v-else class="row w-100 div-vacio">
    <p class="p-vacia">Sin articulos</p>
</div>

</template>

<script>
import ModalInventario from '../../components/inventario/ModalInventario.vue'
import ModalArticulo from '../../components/inventario/ModalArticulo.vue'
import  {computed, onMounted, ref} from 'vue'
import { useStore } from 'vuex'

export default {
    components: {
        ModalInventario, ModalArticulo
    },
    setup(){

        const store = useStore()

        // Filtros categorias
        const filtroCategoria = ref([])

        // Filtros proveedores
        const filtroProveedor = ref([])

        //  Filtros
        const filtros = computed(() => {
            return {
                "categorias": filtroCategoria.value, 
                "proveedores": filtroProveedor.value
            }
        })

        const articulosAlmacenados = computed(() =>{
            return store.getters.getArticulos
        })

        // Obtenemos los articulos almacenados actualmente en el state de vuex
        const articulos = computed(() => {
            return store.getters.getArticulosFiltrados
        })

        //  Obtenemos las categorias
        const categorias = computed(() => {
            return store.getters.getCategorias
        })

        const proveedores = computed(() =>{
            return store.getters.getProveedores
        })

        //  Metodo para convertir el precio a un formato estandar
        const formatoPrecio =  (precio) =>{
            return new Intl.NumberFormat().format(precio)
        }
        

        const configurarArticulos = () =>{
            store.dispatch('establecerArticulosFiltrados', filtros.value)
        }

        // Configuramos el articulo actual para usarlo en el modal
        const configurarArticulo = (articulo) => {
            // Copia del objeto para evitar que se modifique en la lista
            const articuloEstablecido = JSON.parse(JSON.stringify(articulo))
            store.dispatch('establecerArticuloTemporal', articuloEstablecido)
        }

        const eliminarArti = (articulo) => {
            swal({
                text: `¿Eliminar ${articulo.nombre}?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    store.dispatch('eliminarArticulo', articulo.id)
                } 
            });
        }

        return {
            filtroCategoria, filtroProveedor, filtros, articulos, categorias,
            articulosAlmacenados, proveedores,
            formatoPrecio, configurarArticulos, configurarArticulo,
            eliminarArti
        }
    }

}
</script>

