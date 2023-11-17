import ProductManager from "./ProductManager.js";

const socketManager = async(socketServer)=>{
    socketServer.on('connection',async (socket)=>{
        const productsManager =new ProductManager("./products.json")
        try{
            const products=await productsManager.getAllProducts()
            socket.emit("darProductosUnaVez", products)
        }catch(error){
            socket.emit("darProductosUnaVez", "error")
        }

        socket.on('borrarProducto',async (productID)=>{
            try{
                const res = await productsManager.deleteProduct(productID)
                if(res==="ok"){
                    socket.emit("productoBorradoOK",1)
                }else{
                    socket.emit("productoBorradoOK",0)
                }
                const todosProductos = await productsManager.getAllProducts()
                socketServer.emit("actualizacionProductos",todosProductos)
            }catch(error){
                socket.emit("productoBorradoOK",0)
            }   
        })

        socket.on("agregarProducto",async(producto)=>{
            try{
               producto.status=Boolean(producto.status)
               const res = await productsManager.addProduct(producto)
               if(res === "Producto agregado"){
                    const todosProductos = await productsManager.getAllProducts()
                    socketServer.emit("actualizacionProductos",todosProductos)
               }
               socket.emit("productoAgregado",res)
            }catch(error){
                socket.emit("productoAgregado","Error al agregar producto")
            }
        })
    })

    
}
export default socketManager

    