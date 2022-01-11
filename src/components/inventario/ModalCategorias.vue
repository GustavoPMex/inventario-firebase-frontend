<template>
    <div class="modal modalfade" id="categoriasModal" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mx-auto" id="categoriasModalLabel">Categorias</h5>
                </div>
            <div class="modal-body">
                <form  
                    @submit.prevent="nuevaCategoria"
                    class="mb-4"
                >
                    <input 
                        type="text"
                        class="form-control"
                        placeholder="Añadir categoria"
                        v-model="categoria.nombre"
                    >
                    <button 
                        class="btn btn-success btn-form" type="submit"
                        :disabled='btnIsDisabled'
                    > Añadir
                    </button>
                </form>
                <div v-if="categorias.length" class="row w-100 mb-5 mx-auto table-responsive table-cat">
                    <table class="table table-striped table-dark ">
                        <thead>
                            <tr>
                                <th scope="col">Categorias</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody 
                        >
                            <tr
                                v-for="(categoria, index) in categorias"
                                :key="index"
                            >
                                <td class="table-wordbreak">
                                    {{categoria.nombre}}
                                </td>
                                <td>
                                    <a 
                                        @click="eliminarCat(categoria)"
                                        role="button"
                                    >
                                        <i class="fas fa-trash-alt icon-table-del-cat"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else>
                    <p class="p-vacia">Sin categorias</p>
                </div>

            </div>
            <div class="modal-footer text-center">
                <button 
                    type="button" 
                    class="btn btn-secondary mx-auto" 
                    data-dismiss="modal"
                    @click="limpiarCategoria"
                >
                    Cerrar
                </button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import swal from 'sweetalert'


export default {
    setup() {

        const store = useStore()

        const categoria = computed(() =>{
            return store.getters.getCategoria
        })
        
        const categorias = computed(() =>{
            return store.getters.getCategorias
        })

        const btnIsDisabled = computed(() => {
            return !(categoria.value.nombre.length > 2 && categoria.value.nombre.length < 21)
        })

        const limpiarCategoria = () =>{
            store.dispatch('eliminarCategoriaAlmacenada')
        }

        const nuevaCategoria = () =>{
            store.dispatch('nuevaCategoria')
        }

        const eliminarCat = (categoria) => {
            swal({
                text: `¿Eliminar ${categoria.nombre}?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    store.dispatch('eliminarCategoria', categoria.id)
                }
            });
        }

        return {
            categoria, btnIsDisabled,categorias, 
            nuevaCategoria, limpiarCategoria, eliminarCat
        }
    }
}
</script>