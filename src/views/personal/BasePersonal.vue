<template>
    <section class="resume-section">
        <div class="resume-section-content">
            
            <h1 class="mb-5 h1-resume-section">
                Personal
            </h1>
            <!-- Routes -->
            <router-view></router-view>
            
        </div>
    </section>
    <hr class="m-0" />
</template>

<script>


export default {
    components: {
    },
    created(){
        window.scrollTo(0, 0);
    }
}
</script>
