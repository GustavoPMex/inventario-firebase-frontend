<template>

<div v-if="terminados.length" class="row w-100 mb-5 mx-auto table-responsive table-overflow">
    <table class="table table-striped table-dark ">
        <thead>
            <tr>
            <th scope="col">Cliente</th>
            <th scope="col">Técnico</th>
            <th scope="col">Servicio</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Accion</th>
            </tr>
        </thead>
        <tbody 
        >
            <tr
                v-for="(servicio, index) in terminados"
                :key="index"
            >
                <td class="cuadro-tab-size"> {{servicio.cliente.nombre}} </td>
                <td class="cuadro-tab-size"> {{servicio.tecnico.usuario}} </td>
                <td class="cuadro-tab-size"> {{servicio.servicio}} </td> 
                <td class="table-wordbreak cuadro-ta-tab-size"> {{servicio.descripcion}} </td>
                <td>
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
import swal from 'sweetalert'
import { useStore } from 'vuex'
import { computed } from '@vue/reactivity'

export default {
    setup(){

        const store = useStore()

        const serviciosAlmacenados = computed(() =>{
            return store.getters.getTallerServicios
        })

        const terminados = computed(() =>{
            const listaTerminados = serviciosAlmacenados.value.filter(item => item.estado === 'terminado')
            return listaTerminados
        })


        const eliminar = (servicio) =>{
            swal({
                title: `¿Eliminar ${servicio.servicio}?`,
                icon: 'warning',
                buttons: true,
                dangerMode: true
            })
            .then((willDelete) => {
                if (willDelete){
                    store.dispatch('eliminarServicio', servicio.id)
                }
            })
        }

        return {
            serviciosAlmacenados, terminados,
            eliminar
        }
    }
}
</script>

