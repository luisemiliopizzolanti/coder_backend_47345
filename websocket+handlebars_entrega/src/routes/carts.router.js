import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import CartManager from '../managers/CartManager.js';


const router = Router();
const productManager = new ProductManager("./products.json")
const cartManager = new CartManager("./carts.json")

router.get('/:cid',async(req,res)=>{
    try{
        
        const {cid} = req.params
        const cartWithProducts = await cartManager.getCartByIDWithProducts(parseInt(cid))
        res.status(200).send(JSON.stringify(cartWithProducts))
    }catch(error){
        console.log(error)
    }   
})

router.post('/',async(req,res)=>{
    try{
        const productos = req.body;
        const  response= await cartManager.createCart(productos);
        console.log(productos)
        res.status(200).send(response)
    }catch(error){
        console.log(error)
    } 
})

router.post('/:cid/product/:pid/quantity/:quantity',async(req,res)=>{
    try{
        const {cid,pid,quantity} = req.params
        const response = await cartManager.addProductToCart(cid,pid,quantity)
        res.send(response)
    }catch(error){
        res.send(error)
    }
})


export default router