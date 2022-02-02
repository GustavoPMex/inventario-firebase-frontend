<template>
    <nav 
        v-if="autorizacion"
        class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" 
        id="sideNav"
    >
        <a class="navbar-brand js-scroll-trigger" >
            <span class="d-block d-lg-none">
                Adminv
            </span>
            <span class="d-none d-lg-block">
                <img class="img-fluid img-profile rounded-circle mx-auto mb-2" src="/assets/default_photo.jpg" alt="Default Photo" />
            </span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav">

                <li class="nav-item">
                    <router-link 
                        class="nav-link js-scroll-trigger" 
                    to="/" >
                        Inicio
                    </router-link>
                </li>
                
                <li class="nav-item">
                    <router-link 
                    class="nav-link js-scroll-trigger" 
                        :to="{name: 'TallerList'}">
                        Taller
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link 
                        class="nav-link js-scroll-trigger" 
                        :to="{name: 'ClientesList'}"
                    >
                        Clientes
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link 
                        class="nav-link js-scroll-trigger" 
                        :to="{name: 'InventarioArticulos'}" >
                        Inventario
                    </router-link >
                </li>

                <li class="nav-item">
                    <router-link
                    class="nav-link js-scroll-trigger" 
                        :to="{name: 'ProveedoresList'}">
                        Proveedores
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link 
                        class="nav-link js-scroll-trigger" 
                        :to="{name: 'PersonalList'}"
                    >
                        Personal
                    </router-link>
                </li>

                <li class="nav-item">
                    <router-link 
                        class="nav-link js-scroll-trigger" 
                        :to="{name: 'Perfil'}"
                    >
                        Perfil actual
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
    setup() {
        const store = useStore()

        const autorizacion = computed(() =>{
            return store.getters.getAuth
        })

        return {
            autorizacion
        }
    }

}
</script>