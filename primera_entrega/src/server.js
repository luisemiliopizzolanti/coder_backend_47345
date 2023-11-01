import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//Defino las rutas
app.use('/products',productsRouter)
app.use('/carts',cartsRouter)


app.listen(8080, ()=>{
    console.log('Server ok on port 8080');
})