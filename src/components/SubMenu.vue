<template>
<!-- submenu-activate -->
    <div class="row w-100 mb-5 mx-auto justify-content-center">
        <router-link 
            v-for="(elemento, index) in listaElementos"
            :key="index"
            :to="{name: elemento.linkName}" class="col-12 col-md-3 mx-1 mb-1  list-submenu ">
            {{elemento.name}}
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        listaElementos: Object
    }

}
</script>

