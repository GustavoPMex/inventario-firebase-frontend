<template>
    <!-- If card.count == 0, we use 'free-div' -->
    <router-link class="a-content-div mx-auto mb-3 col-12 col-md-3"
        :class="{'free-div': !card.count}"
        :to="{name: 'TallerList'}"
    >
        <div class="div-content-a">
            <i v-if="card.count" class="fas fa-exclamation-triangle  icon-content-a"></i>
            <i v-else class="fas fa-check-circle  icon-content-a"></i>

            <p class="p-content-a mt-3">{{card.name}}</p>

            <p v-if="card.count > 1" class="p-content-a mt-3">{{card.count}} Pendientes</p>
            <p v-else-if="card.count == 1" class="p-content-a mt-3">{{card.count}} Pendiente</p>
            <p v-else class="p-content-a mt-3">Sin Pendientes</p>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        card: Object
    },
}
</script>