import axios from 'axios'
import swal from 'sweetalert'
import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    // <<< ------------------------------ Layout ------------------------------ >>>
    layout: 'principal-layout',
    // <<< ------------------------------ Inicio ------------------------------ >>>
    redesSociales: {
      facebook: '',
      twitter: '', 
      instagram: ''
    },
    // Sirve para almacenar las redes sociales actuales
    // de manera temporal
    redesSocialesTemporal: {
      facebook: '',
      twitter: '', 
      instagram: ''
    },
    // <<< ------------------------------ Inventario ------------------------------ >>>
    articulos: [],
    // Lista que almacena los articulos filtrados por categorias, ésta lista nos provee los elementos en las vistas
    articulosFiltrados: [],
    // El objeto articulo almacenará de manera temporal el objeto para
    // visualizarlo en el formulario
    articulo: {
      nombre: '',
      imagen: '',
      categoria: {},
      descripcion: '',
      proveedor: '',
      precio: 0,
      cantidad: 0
    },
    // Categorias
    categorias: [],
    // Sirve para almacenar una categoria de manera temporal
    categoria: {
      nombre: ''
    },
    // <<< ------------------------------ Proveedores ------------------------------ >>>
    // Lista de proveedores almacenados
    proveedores: [],
    // Lista de proveedores filtrados, ésta lista nos provee los elementos en las vistas
    proveedoresFiltrados: [],
    // Proveedor que almacenaremos de manera temporal
    proveedor: {
      nombre: '',
      direccion: '',
      telefono: '',
      correo: '',
      notaAdicional: '',
    },
    // <<< ------------------------------ Taller ------------------------------ >>>
    tallerServicios: [],
    tallerServiciosFiltrados: [],
    servicioTaller: {
      cliente: {},
      tecnico: {},
      servicio: '',
      tipo: '',
      descripcion: '',
      estado: ''
    },
    // <<< ------------------------------ Clientes ------------------------------ >>>
    clientes: [],
    clientesFiltrados: [],
    cliente: {
      nombre: '',
      descripcion: '',
      telefono: '',
      correo: ''
    },
    // <<< ------------------------------ Personal ------------------------------ >>>
    personal: [],
    // Usamos éste objeto para poder guardar los datos del usuario de manera temporal
    personalFiltrados: [],
    // <<< ------------------------------ Registro ------------------------------ >>>
    registroUsuario: {
      id: 0,
      nombre: '',
      email: '',
      direccion: '',
      telefono: '',
      passwordUno: '',
      passwordDos: '',
    },
    // Autorización del usuario(Token)
    userAuth: false,
    sesionActual: {},
    perfilActualTemporal: {
    }
  },
  mutations: {
    // <<< ------------------------------ Layout ------------------------------ >>>
    SET_LAYOUT(state, newLayout){
      state.layout = newLayout
    },
    // <<< ------------------------------ Redes sociales ------------------------------ >>>
    // Establecemos las redes sociales que actualmente tengamos almacenadas
    // En el local storage
    ESTABLECER_REDES(state, payload){
      state.redesSociales = payload
    },
    // Establecemos temporalmente las redes sociales que tenemos almacenadas
    // actualmente para visualizarlas en el formulario
    ESTABLECER_REDES_TEMPORALES(state, payload){
      state.redesSocialesTemporal = payload
    },
    // Añadimos las nuevas redes sociales que nos provee el formulario
    NUEVAS_REDES_SOCIALES(state, payload){
      state.redesSociales = payload
    },
    // <<< ------------------------------ Articulos ------------------------------ >>>
    // Establece los articulos almacenados en memoria
    ESTABLECER_ARTICULOS(state, payload){
      state.articulos = payload
    },
    ESTABLECER_ARTICULOS_FILTRADOS(state, payload){
      state.articulosFiltrados = payload
    },
    // Para establecer un articulo de manera temporal
    ESTABLECER_ARTICULO_TEMPORAL(state, payload){
      state.articulo = payload
    },
    // Añadimos un nuevo articulo y lo establecemos
    NUEVO_ARTICULO(state, payload){
      state.articulos.push(payload)
    },
    // Actualizamos el articulo 
    ACTUALIZAR_ARTICULO(state, payload){
      state.articulos = state.articulos.map(item => item.id === payload.id ? payload : item)
      state.articulosFiltrados = state.articulosFiltrados.map(item => item.id === payload.id ? payload : item)
    },
    // Elimina el articulo almacenado en "Articulo" que se utilizar 
    // para visualizar en el formulario
    ELIMINAR_ARTICULO_ALMACENADO(state){
      state.articulo = {
        id: 0,
        nombre: '',
        imagen: '',
        categoria: {},
        description: '',
        proveedor: '',
        precio: 0,
        cantidad: 0
      }
    },
    // Eliminar articulo en especifico
    ELIMINAR_ARTICULO(state, payload){
      state.articulos = state.articulos.filter(item => item.id !== payload)
      state.articulosFiltrados = state.articulosFiltrados.filter(item => item.id !== payload)
    },
    // <<< ------------------------------ Categorias ------------------------------ >>>
    // Establemos lo que tengamos almacenado en memoria
    ESTABLECER_CATEGORIAS(state, payload){
      state.categorias = payload
    },
    // Añade una nueva categoria a la lista de categorias
    NUEVA_CATEGORIA(state, payload){
      state.categorias.push(payload)
    },
    // Elimina la categoria almacenada de manera temporal
    ELIMINAR_CATEGORIA_ALMACENADA(state){
      state.categoria.nombre = ''
    },
    // Eliminar categoria
    ELIMINAR_CATEGORIA(state, payload){
      state.categorias = state.categorias.filter(item => item.id !== payload)
      
    },
    // <<< ------------------------------ Proveedores ------------------------------ >>>
    // Establecemos la lista de proveedores
    ESTABLECER_PROVEEDORES(state, payload){
      state.proveedores = payload
    },
    // Establecemos un proveedores temporal para visualizarlo en los inputs
    ESTABLECER_PROVEEDOR_TEMPORAL(state, payload){
      state.proveedor = payload
    },
    // Agregamos un nuevo proveedores a la lista
    NUEVO_PROVEEDOR(state, payload){
      state.proveedores.push(payload)
    },
    // Actualizamos un proveedor, actualizamos tanto en proveedores cómo en las filtraciones
    ACTUALIZAR_PROVEEDOR(state, payload){
      state.proveedores = state.proveedores.map(item => item.id === payload.id ? payload : item)
      state.proveedoresFiltrados = state.proveedoresFiltrados.map(item => item.id === payload.id ? payload : item)
    },
    // Dejamos vacio el proveedor temporal
    ELIMINAR_PROVEEDOR_TEMPORAL(state){
      state.proveedor = {
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
        notaAdicional: '',
      }
    },
    // Eliminamos al proveedor de la lista actual, eliminamos tanto en proveedores cómo en las filtraciones
    ELIMINAR_PROVEEDOR(state, payload){
      state.proveedores = state.proveedores.filter(item => item.id != payload)
      state.proveedoresFiltrados = state.proveedoresFiltrados.filter(item => item.id != payload)
    },
    // Actualizamos la lista de proveedores filtrados con los de la busqueda
    BUSQUEDA_PROVEEDOR(state, payload){
      state.proveedoresFiltrados = payload
    },
    // <<< ------------------------------ Taller ------------------------------ >>>
    ESTABLECER_TALLER_PENDIENTES(state, payload){
      state.tallerServicios = payload
    },
    ESTABLECER_SERVICIO_TEMPORAL(state, payload){
      state.servicioTaller = payload
    },
    NUEVO_SERVICIO_TALLER(state, payload){
      state.tallerServicios.push(payload)
      
    },
    ACTUALIZAR_SERVICIO_TALLER(state, payload){
      state.tallerServicios = state.tallerServicios.map(item => item.id === payload.id ? payload : item)
      state.tallerServiciosFiltrados = state.tallerServiciosFiltrados.map(item => item.id === payload.id ? payload : item)
    },
    ELIMINAR_SERVICIO_TEMPORAL(state){
      state.servicioTaller = {
        id: '',
        cliente: {},
        tecnico: {},
        servicio: '',
        tipo: '',
        descripcion: '',
        estado: ''
      }
    },
    ELIMINAR_SERVICIO_TALLER(state, payload){
      state.tallerServicios = state.tallerServicios.filter(item => item.id != payload)
      state.tallerServiciosFiltrados = state.tallerServiciosFiltrados.filter(item => item.id != payload)
    },
    BUSQUEDA_SERVICIO_TALLER(state, payload){
      state.tallerServiciosFiltrados = payload
    },
    // <<< ------------------------------ Clientes ------------------------------ >>>
    ESTABLECER_CLIENTES(state, payload){
      state.clientes = payload
    },
    ESTABLECER_CLIENTE_TEMPORAL(state, payload){
      state.cliente = payload
    },
    NUEVO_CLIENTE(state, payload){
      state.clientes.push(payload)
    },
    ACTUALIZAR_CLIENTE(state, payload){
      state.clientes = state.clientes.map(item => item.id === payload.id ? payload : item)
      state.clientesFiltrados = state.clientesFiltrados.map(item => item.id === payload.id ? payload : item)
    },
    ELIMINAR_CLIENTE_TEMPORAL(state){
      state.cliente = {
          nombre: '',
          descripcion: '',
          telefono: '',
          correo: ''
      }
    },
    ELIMINAR_CLIENTE(state, payload){
      state.clientes = state.clientes.filter(item => item.id != payload)
      state.clientesFiltrados = state.clientesFiltrados.filter(item => item.id != payload)
    },
    BUSQUEDA_CLIENTE(state, payload){
      state.clientesFiltrados = payload
    },
    // <<< ------------------------------ Personal ------------------------------ >>>
    // Cargar el personal que tenemos almacenados
    ESTABLECER_PERSONAL(state, payload){
      state.personal = payload
    },
    ELIMINAR_USUARIO_TEMPORAL(state){
      state.registroUsuario = {
        id: 0,
        nombre: '',
        email: '',
        direccion: '',
        telefono: '',
        passwordUno: '',
        passwordDos: '',
      }
    },
    BUSQUEDA_PERSONAL(state, payload){
      state.personalFiltrados = payload
    },
    // <<< ------------------------------ Registro ------------------------------ >>>
    ESTABLECER_USER_AUTH(state, payload){
      state.userAuth = payload
    },
    ESTABLECER_SESION_ACTUAL(state, payload){
      state.sesionActual = payload
    },
    NUEVO_USUARIO(state, payload){
      state.personal.push(payload)
    },
    ELIMINAR_USUARIO(state, payload){
      state.personal = state.personal.filter(item => item.id != payload)
      state.personalFiltrados = state.personalFiltrados.filter(item => item.id != payload)
    },
    ESTABLECER_PERFIL_ACTUAL(state, payload){
      state.perfilActualTemporal = payload
    },
    ACTUALIZAR_PERFIL(state, payload){
      state.personal = state.personal.map(item => {
        if (item.id === payload.id) {
          item.foto= payload.foto,
          item.email= payload.email,
          item.direccion= payload.direccion,
          item.telefono= payload.telefono
          return item
        } else {
          return item
        }
      })
    },
    ELIMINAR_PERFIL_ACTUAL_TEMPORAL(state){
      state.perfilActualTemporal = {
        id: 0,
        foto: '',
        email: '',
        direccion: '',
        telefono: 0,
      }
    }
  },
  actions: {
    setLayout({commit}, newLayout){
      commit('SET_LAYOUT', newLayout)
    },
    // <<< ------------------------------ Articulos ------------------------------ >>>
    // Carga todos los articulos que tengamos almacenados actualmente
    async establecerArticulos({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const urlArticulos = `https://inventario-20aa4-default-rtdb.firebaseio.com/articulos/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.get(
          urlArticulos
        )
        .then((response) => {
          const datos = response.data
          const listaArticulos = []
          for (const articulo in datos){
            const articuloAct = datos[articulo]
            articuloAct.id = articulo
            listaArticulos.push(articuloAct)
          }
          commit('ESTABLECER_ARTICULOS', listaArticulos)
        })
        .catch(() =>{
          swal({
            title: 'Ha ocurrido un error',
            text: 'No se han podido obtener los articulos',
            icon: 'warning'
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    // Configuramos el articulo para poder visualizarlo en el formulario
    establecerArticuloTemporal({commit}, articulo){
      commit('ESTABLECER_ARTICULO_TEMPORAL', articulo)
    },
    // Añadimos un nuevo articulo
    async nuevoArticulo({commit, state}, articulo){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const urlArticulos = `https://inventario-20aa4-default-rtdb.firebaseio.com/articulos/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        console.log(articulo)
        await axios.post(
          urlArticulos,
          articulo
        )
        .then((response) => {
          const datosArticulo = response.data
          articulo.id = datosArticulo.name
          commit('NUEVO_ARTICULO', articulo)
          // Se realiza el filtro al instante, para que asi se detecten los cambio al agregar un nuevo elemento
          // ya que nuestra lista principal es el filtro
          commit('ESTABLECER_ARTICULOS_FILTRADOS', state.articulos) 
          router.push({name: 'InventarioArticulos'})
          commit('ELIMINAR_ARTICULO_ALMACENADO')
        })
        .catch(() =>{
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido crear el articulo",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    // Editamos un articulo
    async actualizarArticulo({commit, state}, articuloActualizado){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const urlArticulos =  `https://inventario-20aa4-default-rtdb.firebaseio.com/articulos/${state.sesionActual.id}/${articuloActualizado.id}.json?auth=${datosSesion.tokenSesion}`
        axios.put(
          urlArticulos,
          {
            nombre: articuloActualizado.nombre,
            imagen: articuloActualizado.imagen,
            categoria: articuloActualizado.categoria,
            descripcion: articuloActualizado.descripcion,
            proveedor: articuloActualizado.proveedor,
            precio: articuloActualizado.precio,
            cantidad: articuloActualizado.cantidad
          }
        )
        .then(() => {
          commit('ACTUALIZAR_ARTICULO', articuloActualizado)
        })
        .catch(() =>{
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido actualizar el articulo",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
      
    },
    // Eliminamos lo que se encuentre en state.articulo
    eliminarArticuloAlmacenado({commit}){
      commit('ELIMINAR_ARTICULO_ALMACENADO')
    },
    async eliminarArticulo({commit, state}, idArticulo){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const urlArticulos = `https://inventario-20aa4-default-rtdb.firebaseio.com/articulos/${state.sesionActual.id}/${idArticulo}.json?auth=${datosSesion.tokenSesion}`
        await axios.delete(
          urlArticulos
        )
        .then(() => {
          commit('ELIMINAR_ARTICULO', idArticulo)
        })
        .catch(() =>{
          swal({
            title: 'Ha ocurrido un error',
            text: "No se ha podido eliminar el articulo",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    establecerArticulosFiltrados({commit, state}, filtros){
      if (filtros.categorias.length | filtros.proveedores.length){

        const articulosFiltrados = []
        const filtrosCategoria = Object.values(filtros.categorias)
        const filtrosProveedores = Object.values(filtros.proveedores)

      
        for(const element in state.articulos){
          const articulo = state.articulos[element]
          const categoriaArticulo = articulo.categoria.id
          const proveedorArticulo = articulo.proveedor.id

          if (filtrosCategoria.includes(categoriaArticulo) & 
              filtrosProveedores.includes(proveedorArticulo)){
              articulosFiltrados.push(articulo)
          } else if (filtrosCategoria.includes(categoriaArticulo) & !filtrosProveedores.length){
            articulosFiltrados.push(articulo)
          } else if (filtrosProveedores.includes(proveedorArticulo) & !filtrosCategoria.length){
            articulosFiltrados.push(articulo)
          }
        }
        commit('ESTABLECER_ARTICULOS_FILTRADOS', articulosFiltrados)
      } else {
        commit('ESTABLECER_ARTICULOS_FILTRADOS', state.articulos)        
      }
    },
    // <<< ------------------------------ Categorias ------------------------------ >>>
    // Carga los articulos almacenados en el local storage
    async establecerCategorias({commit, state}){
      if (sessionStorage.getItem('categorias')){
        const categorias = JSON.parse(sessionStorage.getItem('categorias'))
        commit('ESTABLECER_CATEGORIAS', categorias)
      } else {
        sessionStorage.setItem('categorias', JSON.stringify([]))
      }

      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        
        const urlCategorias =  `https://inventario-20aa4-default-rtdb.firebaseio.com/categorias/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.get(
          urlCategorias,
        )
        .then((response) => {
          const datos  = response.data
          const listaCategorias = []
          for (const categoria in datos){
            const categoriaAct = datos[categoria]
            categoriaAct.id = categoria
            listaCategorias.push(categoriaAct)
          }
          commit('ESTABLECER_CATEGORIAS', listaCategorias)
        })
        .catch((error) => {
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido obtener las categorias",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    // Agreamos una categoria y le añadimos un id aleatorio
    async nuevaCategoria({commit, state} ){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const nuevaCat = JSON.parse(JSON.stringify(state.categoria))
        const urlCategorias = `https://inventario-20aa4-default-rtdb.firebaseio.com/categorias/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.post(
          urlCategorias,
          nuevaCat
        )
        .then((response) =>{
          const datosRespuesta = response.data
          // La razon de esto, es porqué el "name" es el correspondiente id o nombre
          // que le asigna en firebase
          nuevaCat.id = datosRespuesta.name
          commit('NUEVA_CATEGORIA', nuevaCat)
          commit('ELIMINAR_CATEGORIA_ALMACENADA')
        })
        .catch(() => {
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido agregar la categoria",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    // Elimina la categoria temporal almacenada
    eliminarCategoriaAlmacenada({commit}){
      commit('ELIMINAR_CATEGORIA_ALMACENADA')
    },
    // Categoria
    async eliminarCategoria({commit, state}, idCategoria){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const urlCategorias = `https://inventario-20aa4-default-rtdb.firebaseio.com/categorias/${state.sesionActual.id}/${idCategoria}.json?auth=${datosSesion.tokenSesion}`
        await axios.delete(
          urlCategorias
        )
        .then(() =>{
          commit('ELIMINAR_CATEGORIA', idCategoria)
        })
        .catch(() =>{
          swal({
            title: 'Ha ocurrido un error',
            text: "No se ha podido eliminar la categoria",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    // <<< ------------------------------ Redes sociales ------------------------------ >>>
    // Carga las redes sociales que tenamos almacenadas actualmente
    // En caso de que no tengamos, se crea el objeto vacío
    establecerRedes({commit}){
      if(sessionStorage.getItem('redes')){
        const redes = JSON.parse(sessionStorage.getItem('redes'))
        commit('ESTABLECER_REDES', redes)
      } else {
        sessionStorage.setItem('redes', JSON.stringify({
          facebook: '',
          twitter: '', 
          instagram: ''
        }))
      }
    },
    // Cuando se llama a ésta funcion, establecemos las redes sociales actuales.
    // Que son almacenadas temporalmente para que podamos utilizarlas 
    // en el formulario
    establecerRedesTemporales({commit}){
      const redes = JSON.parse(sessionStorage.getItem('redes'))
      commit('ESTABLECER_REDES_TEMPORALES', redes)
    },
    // Procesamos el formulario para establecer las nuevas redes sociales
    // y almacenarlas en el local storage
    nuevasRedesSociales({commit, state}, redes){
      commit('NUEVAS_REDES_SOCIALES', redes)
      sessionStorage.setItem('redes', JSON.stringify(state.redesSociales))
      // Limpiamos "las redes sociales actuales" que se usan para
      // visualizarlas en el formulario
      commit('ESTABLECER_REDES_TEMPORALES', {
        facebook: '',
        twitter: '', 
        instagram: ''
      })
    },
    // <<< ------------------------------ Proveedores ------------------------------ >>>
    async establecerProveedores({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const proveedoresUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/proveedores/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.get(
          proveedoresUrl
        )
        .then((responseProveedores) =>{
          const datos = responseProveedores.data
          const listaProveedores = []
          for (const proveedorActual in datos){
            const proveedor = datos[proveedorActual]
            proveedor.id = proveedorActual
            listaProveedores.push(proveedor)
          }
          commit('ESTABLECER_PROVEEDORES', listaProveedores)
        })
        .catch(() =>{
          swal({
            title: 'Error',
            text: "No se ha podido obtener la información",
            icon: 'warning'
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }

    },
    establecerProveedorTemporal({commit}, payload){
      commit('ESTABLECER_PROVEEDOR_TEMPORAL', payload)
    },
    // Agregamos una nueva categoria, a diferencia a los otros actions en donde
    // se agrega un elemento, en éste caso lo tomamos del store, sin necesidad
    // de pasarlo desde el componente o vista
    async nuevoProveedor({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const proveedoresUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/proveedores/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        const nuevoProvee = JSON.parse(JSON.stringify(state.proveedor))
        // Convertimos el telefono a string para validarlo
        nuevoProvee.telefono = nuevoProvee.telefono.toString()
        await axios.post(
          proveedoresUrl,
          nuevoProvee
        )
        .then((response) => {
          const datosRespuesta = response.data
          // La razon de esto, es porqué el "name" es el correspondiente id o nombre
          // que le asigna en firebase
          nuevoProvee.id = datosRespuesta.name
          commit('NUEVO_PROVEEDOR', nuevoProvee)
          // Se realiza el filtro al instante, para que asi se detecten los cambio al agregar un nuevo elemento
          // ya que nuestra lista principal es el filtro
          commit('BUSQUEDA_PROVEEDOR', state.proveedores)
          commit('ELIMINAR_PROVEEDOR_TEMPORAL')
          router.push({name: 'ProveedoresList'})
        })
        .catch(() =>{
          swal({
            title: "Error",
            text: "No se ha podido agregar al proveedor",
            icon: "warning"
          })
        })

      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
      
    },
    // Actualizamos el proveedor que solicitemos, pero a diferencias de los otros actions
    // lo tomamos directamente del store, sin pasarlo como argumento
    async actualizarProveedor({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const proveedorActualizado = JSON.parse(JSON.stringify(state.proveedor))
        const proveedoresUrl =  `https://inventario-20aa4-default-rtdb.firebaseio.com/proveedores/${state.sesionActual.id}/${proveedorActualizado.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.put(
          proveedoresUrl,
          {
            nombre: proveedorActualizado.nombre,
            direccion: proveedorActualizado.direccion,
            telefono: proveedorActualizado.telefono.toString(),
            correo: proveedorActualizado.correo,
            notaAdicional: proveedorActualizado.notaAdicional
          }
        )
        commit('ACTUALIZAR_PROVEEDOR', proveedorActualizado)
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
      
    },
    // Eliminamos el proveedor temporal almacenado
    eliminarProveedorTemporal({commit}){
      commit('ELIMINAR_PROVEEDOR_TEMPORAL')
    },
    // Eliminamos a un proveedor
    async eliminarProveedor({commit, state}, idProveedor){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const proveedoresUrl =  `https://inventario-20aa4-default-rtdb.firebaseio.com/proveedores/${state.sesionActual.id}/${idProveedor}.json?auth=${datosSesion.tokenSesion}`
        await axios.delete(
          proveedoresUrl
        )
        commit('ELIMINAR_PROVEEDOR', idProveedor)
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
      
    // Realizamos una busqueda con lo que el usuario nos provee
    busquedaProveedor({commit, state}, busqueda){
      if (busqueda){
        const listaFiltrados = state.proveedores.filter(item => 
          item.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
        )
        commit('BUSQUEDA_PROVEEDOR', listaFiltrados)
      } else {
        commit('BUSQUEDA_PROVEEDOR', state.proveedores)
      }
    },
    // <<< ------------------------------ Taller ------------------------------ >>>
    async establecerTallerServicios({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const serviciosUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/servicios-taller/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.get(
          serviciosUrl
        )
        .then((response) =>{
          const datos = response.data
          const listaServicios = []
          for (const servicio in datos){
            const servicioAct = datos[servicio]
            servicioAct.id = servicio
            listaServicios.push(servicioAct)
          }
          commit('ESTABLECER_TALLER_PENDIENTES', listaServicios)
        })
        .catch(() =>{
          swal({
            title: 'ERROR',
            text: 'No se han podido obtener los servicios',
            icon: 'warning'
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    establecerServicioTemporal({commit}, servicio){
      commit('ESTABLECER_SERVICIO_TEMPORAL', servicio)
    },
    async nuevoServicioTaller({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const serviciosUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/servicios-taller/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        const nuevoServicio = JSON.parse(JSON.stringify(state.servicioTaller))
        await axios.post(
          serviciosUrl,
          nuevoServicio
        )
        .then(() =>{
          commit('BUSQUEDA_SERVICIO_TALLER', state.tallerServicios)
          commit('NUEVO_SERVICIO_TALLER', nuevoServicio)
        })
        .catch(() => {
          swal({
            title: 'ERROR',
            text: "No se ha podido agregar el servicio",
            icon: "warning"
          })
        })
        
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    async actualizarServicioTaller({commit, state}){
      
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
          const servicioActual = JSON.parse(JSON.stringify(state.servicioTaller))
          const serviciosUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/servicios-taller/${state.sesionActual.id}/${servicioActual.id}.json?auth=${datosSesion.tokenSesion}`
          await axios.put(
            serviciosUrl,
            {
              cliente: servicioActual.cliente,
              tecnico: servicioActual.tecnico,
              servicio: servicioActual.servicio,
              tipo: servicioActual.tipo,
              descripcion: servicioActual.descripcion,
              estado: servicioActual.estado
            }
          )
          .then(() =>{
            commit('ACTUALIZAR_SERVICIO_TALLER', servicioActual)
          })
          .catch(() =>{
            swal({
              title: 'ERROR',
              text: 'No se ha podido actualizar el servicio'
            })
          })

      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    eliminarServicioTemporal({commit}){
      commit('ELIMINAR_SERVICIO_TEMPORAL')
    },
    async eliminarServicio({commit, state}, id){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
          const serviciosUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/servicios-taller/${state.sesionActual.id}/${id}.json?auth=${datosSesion.tokenSesion}`
          await axios.delete(
            serviciosUrl
          )
          .then(() =>{
            commit('ELIMINAR_SERVICIO_TALLER', id)
          })
          .catch(() =>{
            swal({
              title: 'ERROR',
              text: 'No se ha podido eliminar el servicio',
              icon: 'warning'
            })
          })

      } else {
          // Anulamos toda autorización
          commit('ESTABLECER_USER_AUTH', false)
          commit('ESTABLECER_SESION_ACTUAL', {})
          sessionStorage.removeItem('sesionUsuario')
          router.push('/registro')
      }
    },
    busquedaServicioTaller({commit, state}, filtros){
      if (filtros.tecnicos.length | filtros.tipos.length | filtros.estado.length){
        // const serviciosFiltrados = []
        const filtrosTecnicos = Object.values(filtros.tecnicos)
        const filtrosTipos = Object.values(filtros.tipos)
        const filtrosEstado = Object.values(filtros.estado)

        const serviciosFiltrados = state.tallerServicios.filter(
          servicio =>
          filtrosTecnicos.includes(servicio.tecnico.id) &
          filtrosTipos.includes(servicio.tipo) &
          filtrosEstado.includes(servicio.estado) |

          // Tecnicos
          filtrosTecnicos.includes(servicio.tecnico.id) &
          filtrosTipos.includes(servicio.tipo) &
          !filtrosEstado.length |

          filtrosTecnicos.includes(servicio.tecnico.id) &
          !filtrosTipos.length &
          filtrosEstado.includes(servicio.estado) |

          filtrosTecnicos.includes(servicio.tecnico.id) &
          !filtrosTipos.length &
          !filtrosEstado.length |
          
          // Tipo
          !filtrosTecnicos.length &
          filtrosTipos.includes(servicio.tipo) &
          filtrosEstado.includes(servicio.estado) |

          !filtrosTecnicos.length  &
          filtrosTipos.includes(servicio.tipo) &
          !filtrosEstado.length ||

          // Estado
          !filtrosTecnicos.length  &
          !filtrosTipos.length &
          filtrosEstado.includes(servicio.estado)

        )
        commit('BUSQUEDA_SERVICIO_TALLER', serviciosFiltrados)
      } else {
        commit('BUSQUEDA_SERVICIO_TALLER', state.tallerServicios)
      }
    },
    // <<< ------------------------------ Clientes ------------------------------ >>>
    async establecerClientes({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const urlClientes = `https://inventario-20aa4-default-rtdb.firebaseio.com/clientes/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.get(
          urlClientes
        )
        .then((response) =>{
          const datos = response.data
          const listaClientes = []
          for (const cliente in datos){
            const clienteAct = datos[cliente]
            clienteAct.id = cliente
            listaClientes.push(clienteAct)
          }
          commit('ESTABLECER_CLIENTES', listaClientes)
        })
        .catch(() =>{
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido obtener los clientes",
            icon: "warning"
          })
        })

      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    busquedaCliente({commit, state}, busqueda){
      if(busqueda){
        const listaClientes = state.clientes.filter(item => 
          item.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
        )
        commit('BUSQUEDA_CLIENTE', listaClientes)
      } else {
        commit('BUSQUEDA_CLIENTE', state.clientes)
      }
      
    },
    establecerClienteTemporal({commit}, payload){
      commit('ESTABLECER_CLIENTE_TEMPORAL', payload)
    },
    async nuevoCliente({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const nuevoCliente = JSON.parse(JSON.stringify(state.cliente))
        // Convertimos el telefono a str para poder validarlo en firebase
        nuevoCliente.telefono = nuevoCliente.telefono.toString()
        const urlClientes =  `https://inventario-20aa4-default-rtdb.firebaseio.com/clientes/${state.sesionActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.post(
          urlClientes,
          nuevoCliente
        )
        .then((response) =>{
          const datos = response.data
          nuevoCliente.id = datos.name
          commit('NUEVO_CLIENTE', nuevoCliente)
          // Se realiza el filtro al instante, para que asi se detecten los cambio al agregar un nuevo elemento
          // ya que nuestra lista principal es el filtro
          commit('BUSQUEDA_CLIENTE', state.clientes)
          commit('ELIMINAR_CLIENTE_TEMPORAL')
          router.push({name: 'ClientesList'})
        })
        .catch(() =>{
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido agregar al cliente",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    async actualizarCliente({commit, state}){
      
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const clienteActual = JSON.parse(JSON.stringify(state.cliente))
        const urlClientes =  `https://inventario-20aa4-default-rtdb.firebaseio.com/clientes/${state.sesionActual.id}/${clienteActual.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.put(
          urlClientes,
          {
            nombre: clienteActual.nombre,
            descripcion: clienteActual.descripcion,
            // Convertimos el telefono a str para poder validarlo en firebase
            telefono: clienteActual.telefono.toString(),
            correo: clienteActual.correo
          }
        )
        .then(() =>{
          commit('ACTUALIZAR_CLIENTE', clienteActual)
        })
        .catch(() =>{
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido actualizar el cliente",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    eliminarClienteTemporal({commit}){
      commit('ELIMINAR_CLIENTE_TEMPORAL')
    },
    async eliminarCliente({commit, state}, idCliente){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        const urlClientes =  `https://inventario-20aa4-default-rtdb.firebaseio.com/clientes/${state.sesionActual.id}/${idCliente}.json?auth=${datosSesion.tokenSesion}`
        await axios.delete(
          urlClientes
        )
        .then(() =>{
          commit('ELIMINAR_CLIENTE', idCliente)
        })
        .catch(() =>{
          swal({
            title: "Ha ocurrido un error",
            text: "No se ha podido eliminar el cliente",
            icon: "warning"
          })
        })
      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    // <<< ------------------------------ Personal ------------------------------ >>>
    async establecerPersonal({commit, state}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      
      if (datosSesion){
        const firebaseUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/usuarios.json?auth=${datosSesion.tokenSesion}`
        await axios.get(
          firebaseUrl
        )
        .then((responseFirebase) => {
          const datos = responseFirebase.data
          const personal = []
          for(const usuario in datos){
            const datosUsuario = Object.values(datos[usuario])[0]
            if (state.sesionActual["email"] != datosUsuario.email && 
                datosUsuario.email != "admin@admin.com"){
              personal.push(datosUsuario)
            }
          }
          commit('ESTABLECER_PERSONAL', personal)
        })
        .catch(() =>{
           // Anulamos toda autorización
          commit('ESTABLECER_USER_AUTH', false)
          commit('ESTABLECER_SESION_ACTUAL', {})
          sessionStorage.removeItem('sesionUsuario')
          router.push('/registro')
        })

      } else {
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        sessionStorage.setItem('sesionUsuario', JSON.stringify([]))
      }
    },
    eliminarUsuarioTemporal({commit}){
      commit('ELIMINAR_USUARIO_TEMPORAL')
    },
    busquedaPersonal({commit, state}, busqueda){
      if(busqueda){
        const listaFiltrados = state.personal.filter(item => 
          item.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
        )
        commit('BUSQUEDA_PERSONAL', listaFiltrados)

      } else {
        commit('BUSQUEDA_PERSONAL', state.personal)
      }
    },
    // <<< ------------------------------ Registro y Autorizaciones ------------------------------ >>>
    async establecerInicio({commit}){
      const datosSesion = JSON.parse(sessionStorage.getItem('sesionUsuario'))
      if (datosSesion){
        // Establecemos la autorización del usuario
        commit('ESTABLECER_USER_AUTH', true)
        const firebaseUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/usuarios/${datosSesion.id}.json?auth=${datosSesion.tokenSesion}`
        await axios.get(
          firebaseUrl
        )
        .then((responseFirebase) => {
          const datosResponse =  Object.values(responseFirebase.data)[0]
          datosResponse.tokenSesion = datosSesion.tokenSesion
          datosResponse.idObjFirebase = Object.keys(responseFirebase.data)[0]
          commit('ESTABLECER_SESION_ACTUAL', datosResponse)
        })
        .catch(() =>{
           // Anulamos toda autorización
          commit('ESTABLECER_USER_AUTH', false)
          commit('ESTABLECER_SESION_ACTUAL', {})
          sessionStorage.removeItem('sesionUsuario')
          router.push('/registro')
        })

      } else {
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      }
    },
    async ingresoUsuario({commit}, usuario){
      const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoa2fvZeId2U77SJ4BZjaEW_GGDB6B-C4'
      await axios.post(firebaseUrl, {
        email: usuario.correo,
        password: usuario.password,
        returnSecureToken: true
      })
      .then(async (response) => {
        const datosFirebase = response.data
        const tokenAuth = datosFirebase.idToken
        const usuarioUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/usuarios/${datosFirebase.localId}.json?auth=${tokenAuth}`

        await axios.get(
          usuarioUrl,
        )
        .then((usuarioResponse) =>{
          const datosResponse = Object.values(usuarioResponse.data)[0]
          datosResponse.tokenSesion = tokenAuth
          datosResponse.idObjFirebase = Object.keys(usuarioResponse.data)[0]
          commit('ESTABLECER_USER_AUTH', true)
          commit('ESTABLECER_SESION_ACTUAL', datosResponse)
          sessionStorage.setItem('sesionUsuario', JSON.stringify({
              tokenSesion: datosResponse.tokenSesion,
              id: datosResponse.id
          }))
          router.push({name: 'Home'})
        })
        .catch(() => {
          swal({
            icon: 'error',
            title: 'OOPS..',
            text: 'Algo ha salido mal'
          })
        })
      })
      .catch(() => {
        swal({
          icon: 'error',
          title: 'Usuario o contraseña incorrecta',
          text: 'Intenta otra vez'
        })
      })

    },
    cerrarSession({commit}){
      commit('ESTABLECER_USER_AUTH', false)
      commit('ESTABLECER_SESION_ACTUAL', {})
      sessionStorage.removeItem('sesionUsuario')
      router.push('/registro')
    },
    // REGISTRO DE USUARIO
    async nuevoUsuario({commit, state}){
        const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoa2fvZeId2U77SJ4BZjaEW_GGDB6B-C4'
        const nuevoRegistro = JSON.parse(JSON.stringify(state.registroUsuario))
        
        await axios.post(firebaseUrl, {
          email: nuevoRegistro.email,
          password: nuevoRegistro.passwordUno,
          returnSecureToken: true,
        })
        .then(async (response) => {
          const datosFirebase = response.data
          const firebaseUrlUsuario = `https://inventario-20aa4-default-rtdb.firebaseio.com/usuarios/${datosFirebase.localId}.json`

          await axios.post(firebaseUrlUsuario, {
            id: datosFirebase.localId,
            nombre: nuevoRegistro.nombre,
            email: datosFirebase.email,
            direccion: nuevoRegistro.direccion,
            // Se convierte a string para validarlo en firebase
            telefono: nuevoRegistro.telefono.toString(),
          })
          .then(() => {
            commit('ELIMINAR_USUARIO_TEMPORAL') 
            router.push({name: 'Login'})
          })
          .catch((error) => {
            // <------ ELIMINAR USUARIO ----->
            // Éste código es por qué necesitamos eliminar el usuario si ocurre un error al momento de realizar
            // este post para registrar los datos extras del usuario
            const userDatos = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAoa2fvZeId2U77SJ4BZjaEW_GGDB6B-C4`
            axios.post(
              userDatos, 
              {'idToken': datosFirebase.idToken}
            )
            //Retornamos un mensaje de error
            swal({
              icon: 'error',
              title: 'Ha ocurrido un error',
              text: 'Accesso denegado'
            })
          })

        })
        .catch((error) => {
          var msjError;
          const msjFirebase = error.response.data.error.message

          if (msjFirebase === "EMAIL_EXISTS"){
            msjError = 'El correo ya está registrado'
          } else if (msjFirebase === "WEAK_PASSWORD : Password should be at least 6 characters"){
            msjError = "La contraseña debe tener al menos 6 caracteres"
          } else if (msjFirebase === 'INVALID_EMAI'){
            msjError = 'Email inválido'
          } else {
            msjError = 'Sin respuesta del servidor'
          }

          swal({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: `${msjError}`
          })
        })
    },

    async eliminarUsuario({commit, state}, id){
      commit('ELIMINAR_USUARIO', id)
      sessionStorage.setItem('personal', JSON.stringify(state.personal))
      const userDatos = `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAoa2fvZeId2U77SJ4BZjaEW_GGDB6B-C4`
      await axios.post(
        userDatos, 
        {'idToken': id}
      )
    },
    // Editar perfil actual
    establecerPerfilActual({commit, state}){
      const perfilActual = JSON.parse(JSON.stringify(state.userAuth))
      commit('ESTABLECER_PERFIL_ACTUAL', {
        id: perfilActual.id,
        nombre: perfilActual.nombre,
        email: perfilActual.email,
        direccion: perfilActual.direccion,
        telefono: perfilActual.telefono,
        tokenSesion: perfilActual.tokenSesion,
        idObjFirebase: perfilActual.idObjFirebase
      })
    },
    async actualizarPerfil({commit, state}){
      const perfilActual = state.sesionActual
      const datosUsuarioUrl = `https://inventario-20aa4-default-rtdb.firebaseio.com/usuarios/${perfilActual.id}/${perfilActual.idObjFirebase}.json?auth=${perfilActual.tokenSesion}`
      await axios.put(
        datosUsuarioUrl,
        {
          id: perfilActual.id,
          nombre: perfilActual.nombre,
          email: perfilActual.email,
          direccion: perfilActual.direccion,
          telefono: perfilActual.telefono,
        }
      )
      .then(() => {
        commit('ACTUALIZAR_PERFIL', perfilActual)
        commit('ESTABLECER_SESION_ACTUAL', perfilActual)
      })
      .catch(() =>{
        // Anulamos toda autorización
        commit('ESTABLECER_USER_AUTH', false)
        commit('ESTABLECER_SESION_ACTUAL', {})
        sessionStorage.removeItem('sesionUsuario')
        router.push('/registro')
      })
    },
    eliminarPerfilActualTemporal({commit}){
      commit('ELIMINAR_PERFIL_ACTUAL_TEMPORAL')
    }
  },
  getters:{
    getLayout(state){
      return state.layout
    },
    // <<< ------------------------------ Redes sociales ------------------------------ >>>
    getRedesSociales(state){
      return state.redesSociales
    },
    getRedesTemporales(state){
      return state.redesSocialesTemporal
    },
    // <<< ------------------------------ Autorizacion --------------------------------- >>>
    getAuth(state){
      return  state.userAuth
    },
    getSesionActual(state){
      return state.sesionActual
    },
    getAutorizacionCorreo(state){
      return state.sesionActual.email === "admin@admin.com"
    },
    // <<< ------------------------------ Articulos ------------------------------ >>>
    getArticulos(state){
      return state.articulos
    },
    getArticulosFiltrados(state){
      return state.articulosFiltrados
    },
    getArticulo(state){
      return state.articulo
    },
    // <<< ------------------------------ Categorias ------------------------------ >>>
    getCategorias(state){
      return state.categorias
    },
    getCategoria(state){
      return state.categoria
    },
    // <<< ------------------------------ Proveedores ------------------------------ >>>
    getProveedores(state){
      return state.proveedores
    },
    getProveedor(state){
      return state.proveedor
    },
    getProveedoresFiltrados(state){
      return state.proveedoresFiltrados
    },
    // <<< ------------------------------ Taller ------------------------------ >>>
    getTallerServicios(state){
      return state.tallerServicios
    },
    getTallerServiciosFiltrados(state){
      return state.tallerServiciosFiltrados
    },
    getServicio(state){
      return state.servicioTaller
    },
    // <<< ------------------------------ Clientes ------------------------------ >>>
    getClientes(state){
      return state.clientes
    },
    getClientesFiltrados(state){
      return state.clientesFiltrados
    },
    getCliente(state){
      return state.cliente
    },
    // <<< ------------------------------ Personal ------------------------------ >>>
    getPersonal(state){
      return state.personal
    },
    getPersonalFiltrados(state){
      return state.personalFiltrados
    },
    getUsuario(state){
      return state.registroUsuario
    },
    getPerfilActual(state){
      return state.perfilActualTemporal
    }
  },
  modules: {
  },
})
