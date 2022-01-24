<template>

<div class="form-group">
    <label class="label-form">Proveedor</label>
    <router-link 
        v-if="disableBtnAdd"
        title="Agregar categoria"
        :to="{name: 'ProveedoresAgregar'}"
    >
        <i class="fas fa-plus-square icon-add-cat"></i>
    </router-link>
    
    <select
        class="form-select"
        v-model="articulo.proveedor"
    >
        <option :value="''" disabled selected>Seleccione un proveedor</option>
        <option 
            v-for="(proveedor, index) in proveedores"
            :key="index"
            :value="proveedor"
        > {{proveedor.nombre}}
        </option>

    </select>
</div>

<div class="form-group">
    <label class="label-form">Nombre</label>
    <input 
        class='form-control' 
        placeholder = 'Ingresa nombre' 
        v-model.trim="articulo.nombre"
    >
</div>

<div class="form-group">
    <label class="label-form">Imagen</label>
    <input 
        class='form-control' 
        placeholder = 'Ingresa imagen' 
        v-model="articulo.imagen"
    >
</div>

<div class="form-group">
    <label class="label-form">Categoria
    </label>

    <a 
        v-if="disableBtnAdd"
        data-toggle="modal" 
        data-target="#categoriasModal" 
        data-whatever="@getbootstrap"
        data-backdrop="static" 
        data-keyboard="false"
        title="Agregar categoria"
        role="button"
    >
        <i class="fas fa-plus-square icon-add-cat">
        </i>
    </a>

    <p 
        class="categoriaAct"
        v-if="disableCatAct">
        Categoria actual: {{articulo.categoria.nombre}}
    </p>

    <select
        class="form-select"  
        v-model="articulo.categoria"    
    >
        
        <option :value="{}" disabled selected>Seleccione una categoria</option>
        <option 
            v-for="(categoria, index) in categorias"
            :key="index"
            :value="categoria"
        > {{categoria.nombre}}
        </option>
        
    </select>

</div>


<div class="form-group">
    <label class="label-form">Descripción</label>
    <textarea 
        class='form-control' 
        rows="5"
        placeholder = 'Ingresa Descripcion' 
        v-model.trim="articulo.descripcion"
    >
    </textarea>
</div>



<div class="form-group">
    <label class="label-form">Precio</label>
    <input 
        type="number" 
        class="form-control" 
        placeholder="Ingresa precio"
        min="0"
        v-model="articulo.precio"
    >
</div>

<div class="form-group">
    <label class="label-form">Cantidad</label>
    <input 
        type="number" 
        class="form-control" 
        placeholder="Ingresa cantidad"
        min="0"
        v-model="articulo.cantidad"
    >
</div>

    <ModalCategorias />
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import ModalCategorias from './ModalCategorias.vue'
import {useRoute} from 'vue-router'

export default {
    components: {
        ModalCategorias
    },
    props: {
        articulo: Object
    },
    setup(){
        
        const store = useStore()
        const route = useRoute()

        const disableBtnAdd = computed(()=>{
            return route.name == 'InventarioAgregar'
        })

        const disableCatAct = computed(() => {
            return route.name == 'InventarioArticulos'
        }) 
        
        const categorias = computed(() =>{
            return store.getters.getCategorias
        })

        const proveedores = computed(() =>{
            return store.getters.getProveedores
        })

        return {
            categorias, disableCatAct, disableBtnAdd, proveedores,
        }
    },
    
}
</script>