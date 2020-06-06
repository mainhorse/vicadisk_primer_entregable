const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

mongoose.connect('mongodb://localhost:27017/vicadisk',(err,res)=>{
    if(err){
        console.log(`El error es: ${err}`);
    } else{
        console.log('Funciona');
        // app.set('port', process.env.PORT || 3000) --> configuracion de puerto del hosting
        app.listen(port, ()=>{
            console.log(`puerto: ${port}`)
        });
    }
});

// spring-data -> interactua con muchas bases de datos