<template>
<div
    v-if="serviciosAlmacenados.length"
    class="row w-100 mx-auto mb-5 justify-content-center">
    <div class="col-12 col-lg-3  mt-4 mt-lg-2 text-center">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Técnico
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div 
                            v-for="(tecnico, index) in tecnicos"
                            :key="index"
                            class="form-check"
                        >
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                :value="tecnico.id"
                                :id="`checkTecnico${tecnico.id}`"
                                v-model="filtroTecnico"
                                @change="configurarFiltroServicios"
                            >

                            <label
                                class="form-check-label" 
                                :for="`checkTecnico${tecnico.id}`">
                                {{tecnico.nombre}}
                            </label>
                        </div>
                </div>
            </div>
    </div>

    <div class="col-12 col-lg-3  mt-4 mt-lg-2 text-center">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Tipo
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="form-check">
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                value="equipo"
                                id="equipo"
                                v-model="filtroTipo"
                                @change="configurarFiltroServicios"
                            >

                            <label class="form-check-label" for="equipo">
                                Equipo
                            </label>
                        </div>

                        <div class="form-check">
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                value="servicio"
                                id="servicio"
                                v-model="filtroTipo"
                                @change="configurarFiltroServicios"
                            >

                            <label class="form-check-label" for="servicio">
                                Servicio
                            </label>
                        </div>

                        <div class="form-check">
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                value="garantia"
                                id="garantia"
                                v-model="filtroTipo"
                                @change="configurarFiltroServicios"
                            >

                            <label class="form-check-label" for="garantia">
                                Garantia
                            </label>
                        </div>
                </div>
            </div>
    </div>
    <div class="col-12 col-lg-3  mt-4 mt-lg-2 text-center">
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Estado
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <div class="form-check">
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                value="pendiente"
                                id="pendiente"
                                v-model="filtroEstado"
                                @change="configurarFiltroServicios"
                            >

                            <label class="form-check-label" for="pendiente">
                                Pendiente
                            </label>
                        </div>

                        <div class="form-check">
                            <input 
                                class="form-check-input"
                                type="checkbox" 
                                value="terminado"
                                id="terminado"
                                v-model="filtroEstado"
                                @change="configurarFiltroServicios"
                            >

                            <label class="form-check-label" for="terminado">
                                Terminado
                            </label>
                        </div>
                </div>
            </div>
    </div>
</div>



<div v-if="serviciosFiltrados.length" class="row w-100 mb-5 mx-auto table-responsive table-overflow">
    <table class="table table-striped table-dark ">
        <thead>
            <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Técnico</th>
            <th scope="col">Servicio</th>
            <th scope="col">Tipo</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
            </tr>
        </thead>
        <tbody 
        >
            <tr
                v-for="(servicio, index) in serviciosFiltrados"
                :key="index"
            >
                <td class="cuadro-tab-size"> {{servicio.cliente.nombre}} </td> 
                <td class="cuadro-tab-size"> {{servicio.tecnico.nombre}} </td>
                <td class="cuadro-tab-size"> {{servicio.servicio}} </td>
                <td class="cuadro-tab-size"> {{servicio.tipo}} </td>
                <td class="cuadro-tab-size"> {{servicio.estado}} </td>
                <td>
                    <a  
                        data-toggle="modal" 
                        data-target="#editarPendiente" 
                        data-whatever="@getbootstrap"
                        data-backdrop="static" data-keyboard="false"
                        role="button"
                        @click="configurarServicio(servicio)"
                    >
                        <i class="fas fa-pen-square icon-table-up"></i>
                    </a>
                    <ModalTaller />
                    <a 
                        role="button"
                        @click="eliminar(servicio)"
                    >
                        <i class="fas fa-trash-alt icon-table-del"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
    
</div>

<div v-else class="row w-100 div-vacio">
    <p class="p-vacia">Sin servicios</p>
</div>

</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import ModalTaller from '../../components/taller/ModalTaller.vue'

export default {
    components: {
        ModalTaller
    }, 
    setup() {
        
        const store = useStore()

        // Filtros técnicos
        const filtroTecnico = ref([])

        // Filtros tipos
        const filtroTipo = ref([])

        // Filtros estado
        const filtroEstado = ref([])

        // Filtros
        const filtros = computed(() =>{
            return {
                'tecnicos': filtroTecnico.value,
                'tipos': filtroTipo.value,
                'estado': filtroEstado.value
            }
        })

        const serviciosAlmacenados = computed(() =>{
            return store.getters.getTallerServicios
        })

        const serviciosFiltrados = computed(() =>{
            return store.getters.getTallerServiciosFiltrados
        })

        const tecnicos = computed(() =>{
            return store.getters.getPersonal
        })

        const configurarFiltroServicios = () =>{ 
            store.dispatch('busquedaServicioTaller', filtros.value)
        }

        const configurarServicio = (servicio) =>{
            const servicioEstablecido = JSON.parse(JSON.stringify(servicio))
            store.dispatch('establecerServicioTemporal', servicioEstablecido)
        }

        const eliminar = (servicio) =>{
            swal({
                title: `¿Eliminar ${servicio.servicio}?`,
                icon: 'warning',
                buttons: true,
                dangerMode: true
            })
            .then((willDelete) =>{
                if(willDelete){
                    store.dispatch('eliminarServicio', servicio.id)
                }
            })
        }

        return {
            filtroTecnico, filtroTipo, filtroEstado,
            serviciosAlmacenados, serviciosFiltrados, tecnicos,
            configurarServicio, configurarFiltroServicios, eliminar
        }
    }

}
</script>

