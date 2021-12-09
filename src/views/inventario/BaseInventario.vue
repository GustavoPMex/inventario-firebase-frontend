<template>
    <section class="resume-section">
        <div class="resume-section-content">
            
            <h1 class="mb-5 h1-resume-section">
                Inventario
            </h1>

            <SubMenu :listaElementos="listaElementosMenu"/>

            <!-- Routes -->
            <router-view></router-view>
            
        </div>
    </section>
    <hr class="m-0" />
</template>

<script>
import { computed } from '@vue/reactivity'
import SubMenu from '../../components/SubMenu.vue'

export default {
    components: {
        SubMenu
    },
    setup(){

        const listaElementosMenu = computed(() =>{
            return [
                {name: 'Articulos', linkName: 'InventarioArticulos'},
                {name: 'Agregar', linkName: 'InventarioAgregar'},
            ]
        })
        return {
            listaElementosMenu
        }
    },
    created(){
        window.scrollTo(0, 0);
    }

}
</script>
