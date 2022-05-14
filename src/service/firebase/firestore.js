import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore"
import { adaptadorDeProductoDeFirestore } from "../../adapters/products"
import { firestoreDb } from "./index"

export const getProducts = (category) =>{
    return new Promise((resolve, reject)=>{
        const collectionRef = category
            ? query(collection(firestoreDb, 'products'), where('category', '==', category))
            : collection(firestoreDb, 'products')
            getDocs(collectionRef).then(response =>{
                const products = response.docs.map(doc=>{
                    return adaptadorDeProductoDeFirestore(doc)
                })
                resolve(products)
            }).catch(error =>{
                reject(error)
            })
    })
}

export const getDetail = (productId) =>{
    return new Promise((resolve, reject)=>{
            getDoc(doc(firestoreDb, 'products', productId)).then(response =>{
                const product = adaptadorDeProductoDeFirestore(response)
                resolve(product)
            }).catch(error =>{
                reject(error)
            })
    })
}
export const getNavbar = () => {
    return new Promise ((resolve,reject) => {

        getDocs(collection(firestoreDb, 'categories')).then(response => {
            const categories = response.docs.map(doc=>{
                return { id:doc.id, ...doc.data()}
            }) 
            resolve(categories)
        })
        .catch(error => {
            reject(error)
        })
    })
}


