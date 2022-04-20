import { getItem } from '../asyncmock'
import {useState, useEffect } from 'react'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

const ItemListDetail = ({setCart}) =>{
    const [products, setproducts] =useState()
    const [loading, setLoading] = useState(true)

    const {productId} = useParams()

    useEffect(()=>{
        getItem(productId).then(prods=>{
            setproducts(prods)
        }).catch(error=>{
            console.log(error)
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