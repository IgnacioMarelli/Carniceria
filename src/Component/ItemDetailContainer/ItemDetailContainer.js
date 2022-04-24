import {useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { firestoreDb } from '../../service/firebase'
import { getDoc, doc } from 'firebase/firestore'


const ItemListDetail = ({setCart}) =>{
    const [products, setproducts] =useState()
    const [loading, setLoading] = useState(true)

    const {productId} = useParams()

    useEffect(()=>{
       getDoc(doc(firestoreDb, 'products', productId)).then(response=>{
           const product ={ id: response.id, ...response.data()}
           setproducts(product)
       }).finally(()=>{
           setLoading(false)
       })
    }, [])
    
    return (
        <div className="Detalle" >
            {
                loading ?
                    <h1>Cargando...</h1> :
                products ?
                    <ItemDetail {...products} /> :
                    <h1>El producto no existe</h1>
            }

        </div>
    )


}

export default ItemListDetail