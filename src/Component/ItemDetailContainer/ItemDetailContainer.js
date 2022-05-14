import {useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'
import { useAsync } from '../../hooks/customHook'
import { getDetail } from '../../service/firebase/firestore'

const ItemListDetail = ({}) =>{
    const [products, setproducts] =useState()
    const [loading, setLoading] = useState(true)

    const {productId} = useParams()


    useAsync(
        setLoading,
        () => getDetail(productId),
        setproducts,
        () => console.log('Error en ItemDetailContainer'),
        []
    )
    
    
    
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