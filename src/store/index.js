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
      id: 0,
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
      id: 0,
      nombre: ''
    },
    // <<< ------------------------------ Proveedores ------------------------------ >>>
    // Lista de proveedores almacenados
    proveedores: [],
    // Lista de proveedores filtrados, ésta lista nos provee los elementos en las vistas
    proveedoresFiltrados: [],
    // Proveedor que almacenaremos de manera temporal
    proveedor: {
      id: '',
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
      id: '',
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
      id: 0,
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
      foto: '',
      usuario: '',
      email: '',
      direccion: '',
      telefono: 0,
      contrasenaUno: '',
      contrasenaDos: '',
    },
    // Autorización del usuario(Token)
    userAuth: {},
    perfilActualTemporal: {
      id: 0,
      usuario: '',
      foto: '',
      email: '',
      direccion: '',
      telefono: 0,
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
      state.categoria.id = 0
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
        id: '',
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
          id: 0,
          nombre: '',
          descripcion: '',
          telefono: 0,
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
        foto: '',
        usuario: '',
        email: '',
        direccion: '',
        telefono: '',
        contrasenaUno: '',
        contrasenaDos: '',
      }
    },
    BUSQUEDA_PERSONAL(state, payload){
      state.personalFiltrados = payload
    },
    // <<< ------------------------------ Registro ------------------------------ >>>
    INGRESO_USUARIO(state, payload){
      state.userAuth = payload
    },
    CERRAR_SESION(state){
      state.userAuth = {}
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
    establecerArticulos({commit}){
      if (localStorage.getItem('articulos')){
        const articulos = JSON.parse(localStorage.getItem('articulos'))
        commit('ESTABLECER_ARTICULOS', articulos)
      } else {
        localStorage.setItem('articulos', JSON.stringify([]))
      }
    },
    // Configuramos el articulo para poder visualizarlo en el formulario
    establecerArticuloTemporal({commit}, articulo){
      commit('ESTABLECER_ARTICULO_TEMPORAL', articulo)
    },
    // Añadimos un nuevo articulo
    nuevoArticulo({commit, state}, articulo){
      articulo.id = Math.floor((Math.random() * 1000) + 1)
      commit('NUEVO_ARTICULO', articulo)
      localStorage.setItem('articulos', JSON.stringify(state.articulos))
    },
    // Editamos un articulo
    actualizarArticulo({commit, state}, articulo){
      commit('ACTUALIZAR_ARTICULO', articulo)
      localStorage.setItem('articulos', JSON.stringify(state.articulos))
    },
    // Eliminamos lo que se encuentre en state.articulo
    eliminarArticuloAlmacenado({commit}){
      commit('ELIMINAR_ARTICULO_ALMACENADO')
    },
    eliminarArticulo({commit, state}, id){
      commit('ELIMINAR_ARTICULO', id)
      localStorage.setItem('articulos', JSON.stringify(state.articulos))
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
    establecerCategorias({commit}){
      if (localStorage.getItem('categorias')){
        const categorias = JSON.parse(localStorage.getItem('categorias'))
        commit('ESTABLECER_CATEGORIAS', categorias)
      } else {
        localStorage.setItem('categorias', JSON.stringify([]))
      }
    },
    // Agreamos una categoria y le añadimos un id aleatorio
    nuevaCategoria({commit, state} ){
      const nuevaCat = JSON.parse(JSON.stringify(state.categoria))
      nuevaCat.id = Math.floor((Math.random() * 1000) + 1)
      commit('NUEVA_CATEGORIA', nuevaCat)
      localStorage.setItem('categorias', JSON.stringify(state.categorias))
      state.categoria.id = 0
      state.categoria.nombre = ''
    },
    // Elimina la categoria temporal almacenada
    eliminarCategoriaAlmacenada({commit}){
      commit('ELIMINAR_CATEGORIA_ALMACENADA')
    },
    // Categoria
    eliminarCategoria({commit, state}, id){
      commit('ELIMINAR_CATEGORIA', id)
      localStorage.setItem('categorias', JSON.stringify(state.categorias))
    },
    // <<< ------------------------------ Redes sociales ------------------------------ >>>
    // Carga las redes sociales que tenamos almacenadas actualmente
    // En caso de que no tengamos, se crea el objeto vacío
    establecerRedes({commit}){
      if(localStorage.getItem('redes')){
        const redes = JSON.parse(localStorage.getItem('redes'))
        commit('ESTABLECER_REDES', redes)
      } else {
        localStorage.setItem('redes', JSON.stringify({
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
      const redes = JSON.parse(localStorage.getItem('redes'))
      commit('ESTABLECER_REDES_TEMPORALES', redes)
    },
    // Procesamos el formulario para establecer las nuevas redes sociales
    // y almacenarlas en el local storage
    nuevasRedesSociales({commit, state}, redes){
      commit('NUEVAS_REDES_SOCIALES', redes)
      localStorage.setItem('redes', JSON.stringify(state.redesSociales))
      // Limpiamos "las redes sociales actuales" que se usan para
      // visualizarlas en el formulario
      commit('ESTABLECER_REDES_TEMPORALES', {
        facebook: '',
        twitter: '', 
        instagram: ''
      })
    },
    // <<< ------------------------------ Proveedores ------------------------------ >>>
    establecerProveedores({commit}){
      if(localStorage.getItem('proveedores')){
        const proveedores = JSON.parse(localStorage.getItem('proveedores'))
        commit('ESTABLECER_PROVEEDORES', proveedores)
      } else {
        localStorage.setItem('proveedores', JSON.stringify([]))
      }
    },
    establecerProveedorTemporal({commit}, payload){
      commit('ESTABLECER_PROVEEDOR_TEMPORAL', payload)
    },
    // Agregamos una nueva categoria, a diferencia a los otros actions en donde
    // se agrega un elemento, en éste caso lo tomamos del store, sin necesidad
    // de pasarlo desde el componente o vista
    nuevoProveedor({commit, state}){
      const nuevoProvee = JSON.parse(JSON.stringify(state.proveedor))
      nuevoProvee.id = Math.floor((Math.random() * 1000) + 1)
      commit('NUEVO_PROVEEDOR', nuevoProvee)
      localStorage.setItem('proveedores', JSON.stringify(state.proveedores))
      
    },
    // Actualizamos el proveedor que solicitemos, pero a diferencias de los otros actions
    // lo tomamos directamente del store, sin pasarlo como argumento
    actualizarProveedor({commit, state}){
      const proveedorActualizado = JSON.parse(JSON.stringify(state.proveedor))
      commit('ACTUALIZAR_PROVEEDOR', proveedorActualizado)
      localStorage.setItem('proveedores', JSON.stringify(state.proveedores))
    },
    // Eliminamos el proveedor temporal almacenado
    eliminarProveedorTemporal({commit}){
      commit('ELIMINAR_PROVEEDOR_TEMPORAL')
    },
    // Eliminamos a un proveedor
    eliminarProveedor({commit, state}, id){
      commit('ELIMINAR_PROVEEDOR', id)
      localStorage.setItem('proveedores', JSON.stringify(state.proveedores))
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
    establecerTallerServicios({commit}){
      if(localStorage.getItem('tallerServicios')){
        const pendientes = JSON.parse(localStorage.getItem('tallerServicios'))
        commit('ESTABLECER_TALLER_PENDIENTES', pendientes)
      } else {
        localStorage.setItem('tallerServicios', JSON.stringify([]))
      }
    },
    establecerServicioTemporal({commit}, servicio){
      commit('ESTABLECER_SERVICIO_TEMPORAL', servicio)
    },
    nuevoServicioTaller({commit, state}){
      const nuevoServicio = JSON.parse(JSON.stringify(state.servicioTaller))
      nuevoServicio.id =  Math.floor((Math.random() * 1000) + 1)
      commit('NUEVO_SERVICIO_TALLER', nuevoServicio)
      localStorage.setItem('tallerServicios', JSON.stringify(state.tallerServicios))
    },
    actualizarServicioTaller({commit, state}){
      const servicioActual = JSON.parse(JSON.stringify(state.servicioTaller))
      commit('ACTUALIZAR_SERVICIO_TALLER', servicioActual)
      localStorage.setItem('tallerServicios', JSON.stringify(state.tallerServicios))
    },
    eliminarServicioTemporal({commit}){
      commit('ELIMINAR_SERVICIO_TEMPORAL')
    },
    eliminarServicio({commit, state}, id){
      commit('ELIMINAR_SERVICIO_TALLER', id)
      localStorage.setItem('tallerServicios', JSON.stringify(state.tallerServicios))
    },
    busquedaServicioTaller({commit, state}, filtros){
      if (filtros.tecnicos.length | filtros.tipos.length){
        const serviciosFiltrados = []
        const filtrosTecnicos = Object.values(filtros.tecnicos)
        const filtrosTipos = Object.values(filtros.tipos)

        for (const servicio in state.tallerServicios){
          const servicioTaller = state.tallerServicios[servicio]
          const servicioTallerTecnico = servicioTaller.tecnico.id
          const servicioTallerTipo = servicioTaller.tipo

          if (filtrosTecnicos.includes(servicioTallerTecnico) &
              filtrosTipos.includes(servicioTallerTipo)) {
              serviciosFiltrados.push(servicioTaller)
          } else if (filtrosTecnicos.includes(servicioTallerTecnico) & !filtrosTipos.length){
            serviciosFiltrados.push(servicioTaller)
          } else if (filtrosTipos.includes(servicioTallerTipo) & !filtrosTecnicos.length){
            serviciosFiltrados.push(servicioTaller)
          }
        }
        commit('BUSQUEDA_SERVICIO_TALLER', serviciosFiltrados)
      } else {
        commit('BUSQUEDA_SERVICIO_TALLER', state.tallerServicios)
      }
    },
    // <<< ------------------------------ Clientes ------------------------------ >>>
    establecerClientes({commit}){
      if (localStorage.getItem('clientes')) {
        const clientes = JSON.parse(localStorage.getItem('clientes'))
        commit('ESTABLECER_CLIENTES', clientes)
      } else {
        localStorage.setItem('clientes', JSON.stringify([]))
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
    nuevoCliente({commit, state}){
      state.cliente.id = Math.floor((Math.random() * 1000) + 1)
      commit('NUEVO_CLIENTE', state.cliente)
      localStorage.setItem('clientes', JSON.stringify(state.clientes))
    },
    actualizarCliente({commit, state}){
      const clienteActual = JSON.parse(JSON.stringify(state.cliente))
      commit('ACTUALIZAR_CLIENTE', clienteActual)
      localStorage.setItem('clientes', JSON.stringify(state.clientes))
    },
    eliminarClienteTemporal({commit}){
      commit('ELIMINAR_CLIENTE_TEMPORAL')
    },
    eliminarCliente({commit, state}, id){
      commit('ELIMINAR_CLIENTE', id)
      localStorage.setItem('clientes', JSON.stringify(state.clientes))
    },
    // <<< ------------------------------ Personal ------------------------------ >>>
    establecerPersonal({commit}){
      if(localStorage.getItem('personal')) {
        const personal = JSON.parse(localStorage.getItem('personal'))
        commit('ESTABLECER_PERSONAL', personal)
      } else {
        localStorage.setItem('personal', JSON.stringify([]))
      }
    },
    eliminarUsuarioTemporal({commit}){
      commit('ELIMINAR_USUARIO_TEMPORAL')
    },
    busquedaPersonal({commit, state}, busqueda){
      if(busqueda){
        const listaFiltrados = state.personal.filter(item => 
          item.usuario.toLowerCase().startsWith(busqueda.toLowerCase())
        )
        commit('BUSQUEDA_PERSONAL', listaFiltrados)

      } else {
        commit('BUSQUEDA_PERSONAL', state.personal)
      }
    },
    // <<< ------------------------------ Registro ------------------------------ >>>
    establecerInicio({commit}){
      if(localStorage.getItem('sesionUsuario')){
        const usuarioActual = JSON.parse(localStorage.getItem('sesionUsuario'))
        commit('INGRESO_USUARIO', usuarioActual)
      } else {
        localStorage.setItem('sesionUsuario', JSON.stringify({}))
      }
    },
    ingresoUsuario({commit,state}, usuario){
      const usuarioActual = JSON.parse(JSON.stringify(usuario))
      commit('INGRESO_USUARIO', {
        id: usuarioActual.id,
        usuario: usuarioActual.usuario,
        foto: usuarioActual.foto,
        email: usuarioActual.email,
        direccion: usuarioActual.direccion,
        telefono: usuarioActual.telefono
      })
      localStorage.setItem('sesionUsuario', JSON.stringify(state.userAuth))
      router.push('/')

    },
    cerrarSession({commit}){
      commit('CERRAR_SESION')
      localStorage.setItem('sesionUsuario', JSON.stringify({}))
      router.push('/registro')
    },
    nuevoUsuario({commit, state}){
      state.registroUsuario.id = Math.floor((Math.random() * 1000) + 1)
      commit('NUEVO_USUARIO', state.registroUsuario)
      localStorage.setItem('personal', JSON.stringify(state.personal))
    },
    eliminarUsuario({commit, state}, id){
      commit('ELIMINAR_USUARIO', id)
      localStorage.setItem('personal', JSON.stringify(state.personal))
    },
    // Editar perfil actual
    establecerPerfilActual({commit}){
      const perfilActual = JSON.parse(localStorage.getItem('sesionUsuario'))
      commit('ESTABLECER_PERFIL_ACTUAL', {
        id: perfilActual.id,
        usuario: perfilActual.usuario,
        foto: perfilActual.foto,
        email: perfilActual.email,
        direccion: perfilActual.direccion,
        telefono: perfilActual.telefono,
      })
    },
    actualizarPerfil({commit, state}){
      const perfilActual = JSON.parse(JSON.stringify(state.perfilActualTemporal))
      commit('ACTUALIZAR_PERFIL', perfilActual)
      commit('INGRESO_USUARIO', perfilActual)
      localStorage.setItem('sesionUsuario', JSON.stringify(state.userAuth))
      localStorage.setItem('personal', JSON.stringify(state.personal))
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
    // Autorizacion
    getAuth(state){
      return state.userAuth
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
    getSesionActual(state){
      return state.userAuth
    },
    getPerfilActual(state){
      return state.perfilActualTemporal
    }
  },
  modules: {
  },
})
