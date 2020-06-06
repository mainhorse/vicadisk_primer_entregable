const express = require('express');
const UsuarioControl = require('../control/UsuarioControl');
// Importar el paquete connect-multiparty

const multipart = require('connect-multiparty');
// A través de connect-multiparty, apuntamos a la carpeta que deseemos en que se guarden los archivos

const subirImgDirectorio = multipart({uploadDir : './archivos/usuarios'});

var api = express.Router();

// proteccion de rutas en Angular -> guards

// Ruta registrar usuario  -> angular url http://localhost:3000/pi/
api.post('/registro',UsuarioControl.registrarUsuario);

// ruta login
api.post('/login', UsuarioControl.login);

// Ruta Actualizada Usuario
api.put('/actualizar/:id',UsuarioControl.actualizarUsuario);

// Ruta subir imagen Usuario
api.put('/subirImagen/:id',subirImgDirectorio, UsuarioControl.subirImg);

// Ruta mostrar imagen de usuario usuarios
api.get('/obtenerImagen/:imageFile', UsuarioControl.mostrarArchivo)

// Exportar el modulo

module.exports = api;