<template>
    <router-view/>
</template>

<script>
export default {
    beforeCreate(){
        document.body.className = 'registrobody';
    },
}
</script>