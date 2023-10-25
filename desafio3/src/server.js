import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager = new ProductManager("./db.json")

app.get('/iniciarDatos', async(req,res)=>{
    try{
        await productManager.addProduct("Agua 1L","Agua con gas",80,"/rutaimagen",1,20)
        await productManager.addProduct("Refresco 1,5L","Pomelo",100,"/rutaimagen2",2,20)
        await productManager.addProduct("Galletas","Glletas saladas",120,"/rutaimagen3",3,25)
        res.status(200).json({mensaje:"datos de prueba altados"})
    }catch(error){
        res.status(500).json({mensaje:"error al altar datos"})
    }
})

app.get('/products', async(req,res)=>{
    try{
        let limit = req.query.limit;
        let products = await productManager.getAllProducts()
        if(limit){
            let limitProducts = products.slice(0,limit)
            res.status(200).json(limitProducts);
        }else{
            res.status(200).json(products);
        }
    }catch(error){
        res.status(500).json({mensaje:"error al obtener datos"})
    }
})

app.get('/products/:id', async(req,res)=>{
    try{
        let {id} =  req.params
        console.log(id)
        res.status(200).json(await productManager.getProductByID(parseInt(id)));
    }catch(error){
        res.status(500).json({mensaje:"error al obtener datos"})
    }
})

app.listen(8080, ()=>{
    console.log('Server ok on port 8080');
})