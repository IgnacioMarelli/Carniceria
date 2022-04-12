const products = [
    {
        id:1,
        name: 'Asado',
        category:'Ternera',
        img:'https://i.imgur.com/fGV94R8.jpg',
        stock: 10
    },
    {
        id:2,
        name:'Vacio',
        category:'Ternera',
        img:'https://i.imgur.com/YK0uyD9.jpg',
        stock:10
    },
    {
        id:3,
        name:'Bondiola',
        category:'Otras Carnes',
        img:'https://i.imgur.com/1neiBxm.jpeg',
        stock:10
    },
    {
        id:4,
        name:'Chorizo Mezcla',
        category:'Embutidos',
        img:'https://i.imgur.com/Mv6D3Xx.jpg',
        stock:10
    }
]

const categories= [
    {id:'Ternera', description:'Ternera'},
    {id:'Otras Carnes', description:'Otras Carnes'},
    {id:'Embutidos', description:'Embutidos'},
    {id:'Achuras', description:'Achuras'}
]

export const getCategories =()=>{
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(categories)
        }, 500)
    })
}

export const getProducts = (category) =>{
    return new Promise (resolve=>{
        setTimeout(()=>{
            resolve(category ? products.filter(prod => prod.category == category) : products)
        },500)
    })
}

export const getItem = (id) =>{
    return new Promise (resolve=>{
        setTimeout(()=>{
            resolve(products.find(prod=> prod.id == id))
        },500)
    })
}