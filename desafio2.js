const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');

class ProductManager{
    
    constructor(path){
        this.path=path
    }

    async addProduct(title, description,price,thumbnail,code,stock){
        if(title==="" || description==="" || price==="" || thumbnail==="" || code==="" || stock===""){
            return "Todos los campos son obligatorios"
        }else if(await this.#codeExists(code)){
            return "El codigo ya existe, no se puede agregar el producto"
        }else{
            const product = {
                id: await this.#getMaxId()+1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            try{
                let allProducts = await this.getAllProducts();
                allProducts.push(product)
                console.log(allProducts)
                await fs.promises.writeFile(this.path, JSON.stringify(allProducts));
                return "Producto agregado"
            }catch(error){
                console.log(error)
            }
            
        }
    }

    async #getMaxId(){
        let maxId = 0;
        let allProducts = await this.getAllProducts()
        allProducts.map((product) =>{
            if(product.id > maxId) maxId = product.id;
        })
        return maxId;
    }

   async #codeExists(code){
        const products = await this.getAllProducts()
        console.log(products)
        const product= products.find(code => products.code===code )
        if(product===undefined){
            return false
        }else{
            return true
        }
    }

    //Devuelve un array de productos
    async getAllProducts(){
        try {
            if(fs.existsSync(this.path)){
               let products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
               return products
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductByID(id){
        let allProducts = await this.getAllProducts()
        let product = allProducts.find(producto => producto.id===id)
        if(product){
            return product
        }else{
            return "no existe producto con ese id"
        }
    }
}   


const test = async()=>{
    const productManager = new ProductManager("./db.txt")
    await productManager.addProduct("Agua 1L","Agua con gas",80,"/rutaimagen",1,20)
    await productManager.addProduct("Refresco 1,5L","Pomelo",100,"/rutaimagen2",2,20)
    await productManager.addProduct("Galletas","Glletas saladas",120,"/rutaimagen3",3,25)
    console.log("------------Todos------------------")
    console.log(await productManager.getAllProducts())
    console.log("------------Solo ID 3--------------")
    console.log(await productManager.getProductByID(3))
}

test();
