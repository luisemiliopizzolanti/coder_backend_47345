import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from "express-handlebars";
import socketManager from './managers/SocketManager.js';
import { Server } from "socket.io";
import { __dirname } from "./utils.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Defino las rutas
app.use('/products',productsRouter)
app.use('/carts',cartsRouter)
app.use('/views',viewsRouter)

app.get('/',(req, res)=>{
    res.render('inicio')
})

const httpServer = app.listen(8080, ()=>{
    console.log('Server ok on port 8080');
})

const socketServer = new Server(httpServer)
socketManager(socketServer)
