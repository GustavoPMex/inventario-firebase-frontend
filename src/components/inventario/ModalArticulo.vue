<template>
    <div class="modal modalfade" id="articuloDetalles" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title mx-auto" id="articuloDetallesLabel">Detalles</h5>
                </div>
            <div class="modal-body detailOverflow">
                <div class="mb-4">
                    <img
                        v-if="articulo.imagen"
                        :src="`${articulo.imagen}`" 
                        class="imgDetailArticulo" 
                        alt="..."
                    >
                    <img 
                        v-else 
                        src="/assets/default_photo.jpg" 
                        class="imgDetailArticulo" 
                        alt="Default">
                </div>

                <div class="mb-4">
                    <p class="detailArticuloTitle"><strong>Nombre</strong></p>
                    <p class="detailArticulo">{{articulo.nombre}}</p>
                </div>
                
                <div class="mb-4">
                    <p class="detailArticuloTitle"><strong>Categoria</strong></p>
                    <p class="detailArticulo">{{articulo.categoria.nombre}}</p>
                </div>
                
                <div 
                    class="mb-4"
                    v-if="articulo.descripcion"
                >
                    <p class="detailArticuloTitle"><strong>Descripcion</strong></p>
                    <p class="detailArticulo">{{articulo.descripcion}}</p>
                </div>

                <div class="mb-4">
                    <p class="detailArticuloTitle"><strong>Proveedor</strong></p>
                    <p class="detailArticulo">{{articulo.proveedor.nombre}}</p>
                </div>

                <div class="mb-4">
                    <p class="detailArticuloTitle"><strong>Precio</strong></p>
                    <p class="detailArticulo">${{formatoPrecio(articulo.precio)}}</p>
                </div>

                <div class="mb-4">
                    <p class="detailArticuloTitle"><strong>Cantidad</strong></p>
                    <p class="detailArticulo">{{articulo.cantidad}}</p>
                </div>

            </div>
            <div class="modal-footer text-center">
                <button 
                    type="button" 
                    class="btn btn-secondary mx-auto" 
                    data-dismiss="modal"
                    @click="limpiarArticulo"
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
export default {
    setup() {
        const store = useStore()

        const articulo = computed(() => {
            return store.getters.getArticulo
        })

        const formatoPrecio =  (precio) =>{
            return new Intl.NumberFormat().format(precio)
        }

        const limpiarArticulo = () =>{
            store.dispatch('eliminarArticuloAlmacenado')
        }

        return {
            articulo , 
            formatoPrecio, limpiarArticulo
        }
    }
}
</script>