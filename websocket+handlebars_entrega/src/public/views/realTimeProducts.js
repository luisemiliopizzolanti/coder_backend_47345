const socketClient = io();

socketClient.on("darProductosUnaVez",(productos)=>{
  recargarProductos(productos)
})

socketClient.on("actualizacionProductos",(productos)=>{
  recargarProductos(productos)
})

socketClient.on("productoBorradoOK",(respuesta)=>{

  if(respuesta===1){
    alert("Producto Borrado correctamente")
  }else{
    alert("Producto No Eliminado")
  }
  
})

function borrarItem(productID){
  socketClient.emit("borrarProducto",(productID))
}

function recargarProductos(productos){
  let infoProductos = '';
  productos.forEach(product=>{
    infoProductos += `<p> ${product.title} - Descripcion: ${product.description} - Stock: ${product.stock}  - $${product.price} <button onclick="borrarItem(${product.id})">Borrar</button></p>`
  })
  products.innerHTML = infoProductos
}

const form = document.getElementById("nuevoProductoForm");
form.onsubmit = (e)=>{
  e.preventDefault();
  obtenerValores(form)
}


function obtenerValores(formularioProductos) {
  const formDatos = new FormData(formularioProductos);
  const datos = {};

  formDatos.forEach(function(value, key){
    datos[key] = value;
  });

  socketClient.emit("agregarProducto",datos)
  console.log(datos);
}

socketClient.on("productoAgregado",(respuesta)=>{
  alert(respuesta)

})