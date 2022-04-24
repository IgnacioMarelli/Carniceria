import {useState, useEffect } from 'react'
//import { getProducts } from '../asyncmock'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import {getDocs, collection, query, where} from 'firebase/firestore'
import {firestoreDb} from '../../service/firebase/index'
const ItemListContainer = (props) =>{
    const [products, setProducts] =useState([])
    const {category}=useParams()


    useEffect(()=>{
   //     getProducts(category).then(prods=>{
     //       setProducts(prods)
       // }).catch(error=>{
         //   console.log(error)
       // })
       const collectionRef = category ? query(collection(firestoreDb, 'products'), where('category', '==', category)) : collection(firestoreDb, 'products')
       getDocs(collectionRef).then(response =>{
           const products = response.docs.map(doc=>{
               return {id:doc.id, ...doc.data()}
           })
           setProducts(products)
       })
    }, [category])


    return(
        <div>
            <h1>{props.greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer