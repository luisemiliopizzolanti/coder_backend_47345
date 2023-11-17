const socketClient = io();

socketClient.on("darProductosUnaVez",(productsArray)=>{
  let infoProducts = '';
    productsArray.forEach(product=>{
        infoProducts += `<p> ${product.title} - Descripcion: ${product.description} - Stock: ${product.stock}  - $${product.price}</p>`
    })
    products.innerHTML = infoProducts
})
