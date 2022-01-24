<template>

<div class="form-group">
    <label class="label-form">Nombre</label>
    <input 
        class='form-control' 
        placeholder = 'Ingresa nombre' 
        v-model.trim="cliente.nombre"
    >
</div>

<div class="form-group">
    <label class="label-form">Descripción</label>
    <textarea 
        class='form-control' 
        rows="3"
        placeholder = 'Ingresa Descripción' 
        v-model.trim="cliente.descripcion"
    ></textarea>
</div>

<div class="form-group">
    <label class="label-form">Teléfono</label>
    <input 
        type="number" 
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
        v-model.trim="cliente.correo"
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