<template>

<div class="form-group">
    <label class="label-form">Nombre</label>
    <input 
        class='form-control' 
        placeholder = 'Ingresa nombre' 
        v-model="cliente.nombre"
    >
</div>

<div class="form-group">
    <label class="label-form">Descripción</label>
    <textarea 
        class='form-control' 
        rows="3"
        placeholder = 'Ingresa Descripción' 
        v-model="cliente.descripcion"
    ></textarea>
</div>

<div class="form-group">
    <label class="label-form">Teléfono</label>
    <input 
        type="tel" 
        class="form-control" 
        placeholder="Ingresa teléfono"
        v-model="cliente.telefono"
    >
</div>

<div class="form-group">
    <label class="label-form">Correo electrónico</label>
    <input 
        class='form-control' 
        type="email"
        placeholder = 'Ingresa correo ' 
        v-model="cliente.correo"
    >
</div>

</template>


<script>


export default {
    props: {
        cliente: Object
    }
}
</script>