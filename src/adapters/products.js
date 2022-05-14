export const adaptadorDeProductoDeFirestore = (doc) =>{
    const data = doc.data()
    
    const productoFormateado ={
        id: doc.id,
        name: data.name,
        category: data.category,
        img:data.img,
        stock: data.stock,
        price:data.price

    }
    return productoFormateado
}