const products = [
    {
        id:1,
        name: 'Asado',
        category:'Ternera',
        img:'./Media/Tiradeasado.jpg',
        stock: 10
    },
    {
        id:2,
        name:'Vacio',
        category:'Ternera',
        img:'./Media/vacio.jpg',
        stock:10
    },
    {
        id:3,
        name:'Bondiola',
        category:'cerdo',
        img:'./Media/bondiola.jpg',
        stock:10
    },
    {
        id:4,
        name:'Chorizo Mezcla',
        category:'Embutido',
        img:'./Media/chorizoMezcla.jpg',
        stock:10
    }
]

export const getProducts = () =>{
    return new Promise (resolve=>{
        setTimeout(()=>{
            resolve(products)
        },2000)
    })
}

export const getItem = (id) =>{
    return new Promise (resolve=>{
        setTimeout(()=>{
            resolve(products.find(prod=> prod.id === id))
        },2000)
    })
}