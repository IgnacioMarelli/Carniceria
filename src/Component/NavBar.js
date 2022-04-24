import './NavBar.css'
import CartWidget from './CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import {useState, useEffect } from 'react'
import { firestoreDb } from '../service/firebase'
import {getDocs, collection} from 'firebase/firestore'
import CartContext from './context/CartContext'
import { useContext } from 'react'

const NavBar = ()=> {
    const [categories, setCategories] =useState([])
    const {cart}= useContext(CartContext)

    useEffect(()=>{
        getDocs(collection(firestoreDb, 'categories')).then(response=>{
            const categories = response.docs.map(doc=>{
                return { id:doc.id, ...doc.data()}
            }) 
            setCategories(categories)
        })
    }, [])

    return <nav>
        <Link to={`/`} className='Logo'>Carnes Avenida</Link>
        <ul className='bg-dark' >
            {categories.map(cate=> <Link key={cate.id} to={`category/${cate.id}`}><li>{cate.description}</li></Link>)}
            {cart.length > 0 ? <Link to={`/Cart`}><CartWidget/></Link>: '¡Bienvenido!'}
        </ul>
 
        </nav>
}

export default NavBar