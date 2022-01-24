<template>

<div class="form-group">
    <label class="label-form">Nombre</label>
    <input 
        class='form-control' 
        placeholder = 'Ingresa nombre' 
        v-model.trim="proveedor.nombre"
    >
</div>

<div class="form-group">
    <label class="label-form">Dirección</label>
    <textarea 
        class='form-control' 
        rows="3"
        placeholder = 'Ingresa Dirección' 
        v-model.trim="proveedor.direccion"
    ></textarea>
</div>


<div class="form-group">
    <label class="label-form">Teléfono</label>
    <input 
        type="number" 
        class="form-control" 
        placeholder="Ingresa teléfono"
        v-model="proveedor.telefono"
    >
</div>

<div class="form-group">
    <label class="label-form">Correo electrónico</label>
    <input 
        class='form-control' 
        type="email"
        placeholder = 'Ingresa correo electrónico' 
        v-model.trim="proveedor.correo"
    >
</div>

<div class="form-group">
    <label class="label-form">Nota adicional</label>
    <textarea 
        class='form-control' 
        rows="5"
        placeholder = 'Ingresa nota adicional' 
        v-model.trim="proveedor.notaAdicional"
    ></textarea>
</div>
</template>


<script>


export default {
    props: {
        proveedor: Object
    }
}
</script>