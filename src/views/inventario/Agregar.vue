<template>
    <form @submit.prevent="nuevoArticulo">
        <InputsInventario :articulo='articulo'/>
        <button 
            type="submit" 
            class="btn btn-success btn-form"
            :disabled='btnIsDisabled'
        >
            Crear
        </button>
    </form>
</template>


<script>
import InputsInventario from '../../components/inventario/InputsInventario.vue'
import {useStore} from 'vuex'
import { computed } from '@vue/reactivity'
import  {useRouter} from 'vue-router'

export default {
    components: {
        InputsInventario
    },
    setup() {

        const store = useStore()
        const router = useRouter()

        // Obtenemos get articulo para pasarlo a los inputs.
        // En éste caso estarán vacias las propiedades del objeto
        const articulo = computed(() =>{
            return store.getters.getArticulo
        })

        // Si todos los campos están llenos, entonces habilitamos el botón
        const btnIsDisabled = computed(() => {
            const articuloActual = articulo.value
            if( articuloActual.nombre && 
                Object.entries(articuloActual.categoria).length && 
                articuloActual.descripcion && articuloActual.proveedor && 
                articuloActual.precio && articuloActual.cantidad){
                return false
            }
            return true
        })

        // Hacemos un llamado para limpiar los inputs
        const limpiarInputs = () => {
            store.dispatch('eliminarArticuloAlmacenado')
        }
        // Hacemos un llamado a la acción para añadir un nuevo articulo.
        const nuevoArticulo = () => {
            store.dispatch('nuevoArticulo', articulo.value)
            .then(() => {
                router.push({name: 'InventarioArticulos'})
                limpiarInputs()
            })
        }

        return {
            articulo, btnIsDisabled, 
            limpiarInputs, nuevoArticulo
        }
    },
    watch: {
        // Si cambiamos de vista, se limpiaran los inputs
        $route (to, from){
            this.limpiarInputs()
        }
    }
}
</script>

