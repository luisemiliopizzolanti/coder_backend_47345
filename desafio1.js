class ProductManager{
    
    constructor(){
        this.products=[];
    }

    addProduct(title, description,price,thumbnail,code,stock){
        if(title==="" || description==="" || price==="" || thumbnail==="" || code==="" || stock===""){
            return "Todos los campos son obligatorios"
        }else if(this.#codeExists(code)){
            return "El codigo ya existe, no se puede agregar el producto"
        }else{
            console.log("hola")
            const product = {
                id: this.#getMaxId()+1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(product)
            return "Producto agregado"
        }
    }

    #getMaxId(){
        let maxId = 0;
        this.products.map((product) =>{
            if(product.id > maxId) maxId = product.id;
        })
        return maxId;
    }
    #codeExists(code){
        const product = this.products.find(code => this.products.code===code )
        if(product===undefined){
            return false
        }else{
            return true
        }
    
    
    }

    getAllProducts(){
        return this.products
    }

    getProductByID(id){
        return this.products.find(id => this.products.id===id)
    }
}   

const productManager = new ProductManager()
//console.log(productManager.getAllProducts())
console.log(productManager.addProduct("Agua 1L","Agua con gas",80,"/rutaimagen",1,20))
console.log(productManager.getAllProducts())
console.log(productManager.addProduct("Agua 1L","Agua con gas",80,"/rutaimagen",2,20))
//console.log(productManager.addProduct("Agua 1L","Agua con gas",80,"/rutaimagen",1,20))
console.log(productManager.getAllProducts())
