import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';


const router = Router();
const productManager = new ProductManager("./products.json")

//Inicializa la base de datos con datos de prueba
router.get('/iniciarDatos', async(req,res)=>{
    try{
        const product1 ={
            "title":"Agua 1L",
            "description":"Agua con gas",
            "price":80,
            "thumbnail":"/rutaimagen",
            "code":1,
            "stock":20,
            "category":"bebida",
            "status":true
        }
        console.log(await productManager.addProduct(product1))
       /*await productManager.addProduct("Agua 1L","Agua con gas",80,"/rutaimagen",1,20)
        await productManager.addProduct("Refresco 1,5L","Pomelo",100,"/rutaimagen2",2,20)
        await productManager.addProduct("Galletas","Glletas saladas",120,"/rutaimagen3",3,25)*/
        res.status(200).json({mensaje:"datos de prueba altados"})
    }catch(error){
        res.status(500).json({mensaje:"error al altar datos"})
    }
})

/*
Obtiene todos los productos, puede limitar la cantidad usando  un parametro
en la query ?limit para limitar la cantidad a mostrar
*/
router.get('/', async(req,res)=>{
    try{
        //obtengo el limite si viene por parametro en la query
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

//Obtiene un producto por ID
router.get('/:id', async(req,res)=>{
    try{
        let {id} =  req.params
        res.status(200).json(await productManager.getProductByID(parseInt(id)));
    }catch(error){
        res.status(500).json({mensaje:"error al obtener datos"})
    }
})

//Crea un nuevo producto
router.post('/',async(req,res)=>{
    try{
    //Obtengo datos que vienen del body (front)
    const { title,description,code,price,status,stock,category,thumbnails } = req.body;
    const nuevoProducto = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
      };
    const retorno = await productManager.addProduct(nuevoProducto)
    console.log(retorno)
    res.send(retorno)
    }catch(error){
        res.status(500).json({mensaje:"error altar producto"})
    }

})

//Actualiza un producto
router.put("/:pid", async(req,res)=>{
    try {
        let {pid} =  req.params
        let id = parseInt(pid)
        const productToUpdate={id,...req.body}
        const productUpdate =  await productManager.updateProduct(productToUpdate)
        res.status(200).json(JSON.stringify(productUpdate))
    } catch (error) {
        res.status(500).json({mensaje:"error al actualizar producto"})
    }
})

router.delete("/:pid", async(req,res)=>{
    try {
        let {pid} =  req.params
        let id = parseInt(pid)
        const response = await productManager.deleteProduct(id)
        if(response==='ok'){
            res.status(200).send("Producto borrado")
        }else{
            res.status(200).send("Producto con ese ID no encontrado")
        }
       
    } catch (error) {
        res.status(500).send(error)
    }
})

export default router;