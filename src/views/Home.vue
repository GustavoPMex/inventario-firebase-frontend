<template>

<section class="resume-section">
  <div class="resume-section-content">
        <h1 class="mb-5 h1-resume-section">
            Bienvenido
            <span class="text-primary">{{usuarioActual}}</span>
        </h1>
        <div class="subheading w-100 mb-5">
            <p class="p-subheading">Mantente al día</p>
        </div>
        <div class="row w-100 mb-5 mx-auto">
            <HomeCard :card="{name: 'Equipos', count: totalEquipos}"/>

            <HomeCard :card="{name: 'Servicios', count: totalServicios}" />

            <HomeCard :card="{name: 'Garantias', count: totalGarantias}" />
        </div>

        <!-- Redes sociales -->
        <div class="subheading w-100 mb-5">
            <p class="p-subheading">Manten actualizadas tus redes</p>
        </div>

        <!-- Comprobar redes sociales -->
        <div v-if="(redes.facebook || 
                    redes.twitter || 
                    redes.instagram
                    )" 
              class="social-icons">

            <a v-if="redes.facebook" 
              class="social-icon facebook" 
              target="_blank" 
              :href="`${redes.facebook}`">
              <i class="fab fa-facebook-square"></i>
            </a>

            <a v-if="redes.twitter" 
              class="social-icon twitter" 
              target="_blank" 
              :href="`${redes.twitter}`">
              <i class="fab fa-twitter-square"></i>
            </a>

            <a v-if="redes.instagram" 
              class="social-icon facebook" 
              target="_blank" 
              :href="`${redes.instagram}`">
              <i class="fab fa-instagram-square"></i>
            </a>
        </div>
        
        <div v-else>
          <p class="p-vacia">Sin redes sociales</p>
        </div>

        <button
          v-if="authorization" 
          class="btn btn-success mt-5"
          data-toggle="modal" 
          data-target="#modalRedes" 
          data-whatever="@getbootstrap"
          data-backdrop="static" data-keyboard="false"
          @click="redesActuales"
        >
          Editar
        </button>

        <ModalRedesSociales />
  </div>
</section>
<hr class="m-0" />

</template>


<script>
import HomeCard from '../components/HomeCard.vue'
import ModalRedesSociales from '../components/ModalRedesSociales.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

export default {
  name: 'Home',
  components: {
    HomeCard, ModalRedesSociales
  },
  setup() {
    const store = useStore()

    // Comprobamos que el usuario esté autorizado
    const authorization = computed(() =>{
      return store.getters.getAuth
    })

    // Usuario logeado actualmente
    const usuarioActual = computed(() =>{
      return store.getters.getSesionActual.nombre
    })

    // Las redes sociales que tenemos actualmente almacenadas
    // en el state de vuex
    const redes = computed(() => {
      return store.getters.getRedesSociales
    })

    // Total servicios
    const servicios = computed(() =>{
      return store.getters.getTallerServicios
    })
    // Total equipos
    const totalEquipos = computed(() => {
      const serviciosPendientes = servicios.value.filter(item => 
          item.tipo === 'equipo' && item.estado === 'pendiente'
      )
      return serviciosPendientes.length
    })
    // Total servicios
    const totalServicios = computed(() => {
      const serviciosPendientes = servicios.value.filter(item => 
          item.tipo === 'servicio' && item.estado === 'pendiente'
      )
      return serviciosPendientes.length
    })
    // Total garantias
    const totalGarantias = computed(() => {
      const serviciosPendientes = servicios.value.filter(
          item => item.tipo === 'garantias' && item.estado === 'pendiente'
      )
      return serviciosPendientes.length
    })

    // Establecemos las redes sociales que tenemos guardadas actualmente
    // para que podamos ver los datos el form de redes sociales
    const redesActuales = ()  => {
      store.dispatch('establecerRedesTemporales')
    }

    const establecerLayout = () => {
          store.dispatch('setLayout', 'principal-layout')
      }

    const cargarPendientes = () => {
      store.dispatch('establecerTallerServicios')
    }

    return {
      authorization, usuarioActual, redes,
      totalEquipos, totalServicios, totalGarantias,
      redesActuales, establecerLayout}

  },
  created(){
    this.establecerLayout()
    window.scrollTo(0, 0);
  },
  
}
</script>
