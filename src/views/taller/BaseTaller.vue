<template>
    <section class="resume-section">
        <div class="resume-section-content">
            <h1 class="mb-5 h1-resume-section">
                Taller
            </h1>
            <subMenu :listaElementos="listaElementosMenu"/>
            <!-- Routes -->
            <router-view></router-view>
        </div>
    </section>

    <hr class="m-0" />
</template>

<script>
import { computed, onBeforeMount } from '@vue/runtime-core'
import { useStore } from 'vuex'
import subMenu from '../../components/SubMenu.vue'

export default { 
    components:{
        subMenu
    },
    setup() {
        const store = useStore()

        const listaElementosMenu = computed(() =>{
            return [
                {name: 'Pendientes', linkName: 'TallerPendientes'},
                {name: 'Terminados', linkName: 'TallerTerminados'},
                {name: 'Agregar', linkName: 'TallerAgregar'}

            ]
        })

        const cargarPendientes = () => {
            store.dispatch('establecerTallerServicios')
        }

        onBeforeMount(() =>{
            cargarPendientes()
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
