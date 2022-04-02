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
    }
]

export const getProducts = () =>{
    return new Promise (resolve=>{
        setTimeout(()=>{
            resolve(products)
        },2000)
    })
}