<template>
    <div class="form-group">
        <label class="label-form">Cliente</label>
        
        <router-link 
            v-if="habilitarOpcion"
            title="Agregar cliente"
            :to="{name: 'ClientesAgregar'}"
        >
            <i class="fas fa-plus-square icon-add-cat"></i>
        </router-link>

        <select
            class="form-select"
            v-model="servicio.cliente"
        >
            <option :value="{}" disabled selected>Seleccione un cliente</option>
            <option 
                v-for="(cliente, index) in clientes"
                :key="index"
                :value="cliente">
                {{cliente.nombre}}
            </option>
        </select>
    </div>

    <div class="form-group">
        <label class="label-form">Técnico</label>

        <select
            class="form-select"
            v-model="servicio.tecnico"
        >
            <option :value="{}" disabled selected>Seleccione un técnico</option>
            <option 
                v-for="(tecnico, index) in tecnicos"
                :key="index"
                :value="tecnico"
            > {{tecnico.usuario}}
            </option>
        </select>
    </div>

    <div class="form-group">
        <label class="label-form">Servicio</label>
        <input 
            class='form-control' 
            placeholder = 'Ingresa Servicio' 
            v-model="servicio.servicio"
        >
    </div>

    <div class="form-group">
        <label class="label-form">Tipo de servicio</label>
        <select
            class="form-select"
            v-model="servicio.tipo"
        >
            <option :value="''" disabled selected>Seleccione un tipo</option>
            <option value="equipo"> Equipo </option>
            <option value="servicio"> Servicio </option>
            <option value="garantias"> Garantias </option>
        </select>
    </div>

    <div class="form-group">
        <label class="label-form">Descripción</label>
        <textarea 
            class='form-control' 
            rows="5"
            placeholder = 'Ingresa Descripción' 
            v-model="servicio.descripcion"
        ></textarea>
    </div>

    <div class="form-group">
        <label class="label-form">Estado</label>

        <select
            class="form-select"
            v-model="servicio.estado"
        >
            <option :value="''" disabled selected>Estado</option>

            <option 
                value="pendiente" selected
                v-if="habilitarOpcion"
            > Pendiente
            </option>

            <option 
                v-else
                value="terminado" selected
            > Terminado
            </option>
        </select>
    </div>

</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
    props: {
        servicio: Object
    },
    setup(){
        const store = useStore()
        const route = useRoute()

        const clientes = computed(() =>{
            return store.getters.getClientes
        })

        const tecnicos = computed(() =>{
            return store.getters.getPersonal
        })

        const habilitarOpcion = computed(() =>{
            return route.name === 'TallerAgregar'
        })

        const cargarClientes = () =>{
            store.dispatch('establecerClientes')
        }

        onMounted(async() =>{
            cargarClientes()
        })
    

        return {
            clientes, tecnicos, habilitarOpcion
        }
    }
}
</script>