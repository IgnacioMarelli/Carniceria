import {useState} from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { getProducts } from '../../service/firebase/firestore'
import { useAsync } from '../../hooks/customHook'

const ItemListContainer = (props) =>{
    const [products, setProducts] =useState([])
    const [loading, setLoading]=useState(false)
    const {category}=useParams()

    useAsync(
        setLoading,
        ()=>getProducts(category),
        setProducts,
        ()=>console.log('error'),
        [category]
    )
    
    if(loading){
        return <h1>Cargando...</h1>
    }

    return(
        <div>
            <h1>{props.greeting}</h1>
            <ItemList products={products}/>
        </div>
    )
}

export default ItemListContainer