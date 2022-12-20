const express = require('express');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const app = express();
app.use(express.json());
const port = 5656;




const url = "mongodb://127.0.0.1:27017";
const dbName = "app_menu";
const connect = mongoose.connect(url, { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true
});


function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);
 
    if (!authheader) {
        var err = new Error('Nao esta autenticado');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        return next(err)
    }
 
    var auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
 
    if (user == 'ijr' && pass == '123456') {
 
        // Caso seja autorizado
        next();
    } else {
        var err = new Error('Nao esta autenticado ');
        res.setHeader('WWW-Authenticate', 'Basic');
    }
 
}
 

app.use(authentication)






connect.then(()=>{
    let pratos = require("./controllers/menu_do_dia");
    console.log("Esta conectado ao servidor");
   
    
    app.use("/pratos", pratos);
    app.listen(port, () =>  console.log());
    
    })

   