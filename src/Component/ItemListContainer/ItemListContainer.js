import {useState, useEffect } from 'react'
import { getProducts } from '../asyncmock'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'

const ItemListContainer = (props) =>{
    const [products, setProducts] =useState([])
    const {category}=useParams()


    useEffect(()=>{
        getProducts(category).then(prods=>{
            setProducts(prods)
        }).catch(error=>{
            console.log(error)
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