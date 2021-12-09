<template>
<section class="resume-section">
    <div class="resume-section-content">
        <h1 class="mb-5 h1-resume-section">
            Perfil Actual
        </h1>

        <!-- Routes -->
        <router-view></router-view>

    </div>
</section>
</template>

<script>
export default {
    created(){
        window.scrollTo(0, 0);
    }
}
</script>
