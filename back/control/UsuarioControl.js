const Usuario = require('../modelo/usuario');
// Importar el módulo file System de node 
const fs= require('fs');
// Importar el modulo path
const path = require('path');


// funcion de registro usuario
function registrarUsuario(req, res){
    var usuario = new Usuario();
    var parametros = req.body;

    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = 'Usuario'; // podemos quemar en la base de datos el registro del usuario con rol admin
    usuario.imagen = null;

    //funcion save para interactuar con la BD
    usuario.save((err,usuarioNuevo)=>{
        if(err){
            res.status(500).send({message: "Error del servidor"});
        } else {
            if(!usuarioNuevo){
                res.status(200).send({message : "No fue posible realizar el registro"});
            } else{
                res.status(200).send({
                    message : "Usuario Creado",
                    usuario: usuarioNuevo
                });
            }
            
        }
            
    });

}

//Funcion de login
function login(req, res){
    var parametros = req.body;
    var correoUsuario = parametros.correo;
    var contraUsuario = parametros.contrasena;
    console.log(contraUsuario);
    console.log(contraUsuario);
    
    Usuario.findOne({correo: correoUsuario}, (err, usuarioLogueado)=> {
        if(err){
            res.status(500).send({message : "Error en el servidor"});
        } else{
            if(!usuarioLogueado){
                res.status(200).send({message: "datos incorrectos"});
            } else {
                if(usuarioLogueado.contrasena != contraUsuario){
                    res.status(200).send({message : "datos incorrectos"})
                } else {
                    res.status(200).send({
                        message: "bienvenido",
                        usuario : usuarioLogueado
                    });
                }
            }
        }
    });
}

//Funcion de actualizar Usuario
function actualizarUsuario(req, res){
    // localhost:3000/api/editar/:id
    var usuarioId = req.params.id;
    var nuevosDatosUsuario = req.body;

    Usuario.findByIdAndUpdate(usuarioId, nuevosDatosUsuario, (err, usuarioActualizado)=>{
        if(err){
            res.status(500).send({message : "Error en el servidor"});
        } else {
            if(!usuarioActualizado){
                res.status(200).send({message : "No fue posible actualizar tus datos"});
            } else {
                res.status(200).send({
                    message: "Usuario Actualizado",
                    usuario: nuevosDatosUsuario
                });
            }
        }
    });
}

// Funcion eliminar Usuario


//Funcionsubir imagen
function subirImg(req, res){
    var usuarioId = req.params.id;
    var nombreArchivo = "No has subido ninguna imagen...";

    // validar si efectivamente se esta enviando un archivo
    if(req.files){
        // Vamos a ir analizando la ruta del archivo, el nombre y la extencion
        // C:\\usuarios\descargas\imagen.png
        var rutaArchivo = req.files.imagen.path;
        console.log(`ruta archivo : ${rutaArchivo}`);

        // Haremos un split para separar elementos
        // Esto nos generara un arreglo de datos
        var partirArchivo = rutaArchivo.split('\\');
        console.log(`partir Archivo: ${partirArchivo}`);
    
        // acceder a la posicion que contiene el nombre del archivo
        var nombreArchivo = partirArchivo[2];
        console.log(`posicion dato : ${nombreArchivo}`);

        // Haremos un split para separar el nombre del archivo de la extencion
        var extensionImg = nombreArchivo.split('\.');
        console.log(`partir imagen : ${extensionImg}`);

        //Accedemos a la posicion de la extencion del archivo
        var extensionArchivo = extensionImg[1];
        console.log(`Extension Archivo: ${extensionArchivo}`);

        // Validar si el formato del archivo es aceptado
        if(extensionArchivo == "png" || extensionArchivo == "jpg"){
            // Actualizar del usuario el campo imagen
            Usuario.findByIdAndUpdate(usuarioId, {imagen : nombreArchivo}, (err, usuarioConImagen)=>{
                if(err){
                    res.status(500).send({message : "Error en el servidor"});
                } else {
                    if(!usuarioConImagen){
                        res.status(200).send({message : "No fue posible subir la imagen"});
                    } else {
                        res.status(200).send({
                            message: "Imagen Anexada",
                            imagen: nombreArchivo,
                            usuario: usuarioConImagen
                        })
                    }
                }
            });

        } else {
            // formato no valido
            res.status(200).send({message: "Formato invalido"});
        }

    } else {
        res.status(200).send({message : "No has subido una imagen..."});
    }
}

function mostrarArchivo(req, res){
    // pedir el archivo que queremos mostrar

    var archivo = req.params.imageFile;
    // Ubicacion del archivo
    var ruta = './archivos/usuarios/' +archivo;

    // validar si existe o no
    // fs.exists('la ruta del archivo'. (exiate)=>{})
    fs.exists(ruta,(exist)=>{
        if(exist){
            res.sendFile(path.resolve(ruta));
        } else{
            res.status(200).send({message: "imagen no encontrada"});
        }
    })
}

// exportar paquetes de funciones

module.exports = {
    registrarUsuario,
    login,
    actualizarUsuario,
    subirImg,
    mostrarArchivo
}