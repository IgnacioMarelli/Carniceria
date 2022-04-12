import './NavBar.css'
import CartWidget from './CartWidget/CartWidget'
import { getCategories} from './asyncmock'
import { Link } from 'react-router-dom'
import {useState, useEffect } from 'react'

const NavBar = ()=> {
    const [categories, setCategories] =useState([])


    useEffect(()=>{
        getCategories().then(categories=>{
            setCategories(categories)
        }).catch(error=>{
            console.log(error)
        })
    }, [])

    return <nav>
        <Link to={`/`} className='Logo'>Carnes Avenida</Link>
        <ul className='bg-dark' >
            {categories.map(cate=> <Link key={cate.id} to={`category/${cate.id}`}><li>{cate.description}</li></Link>)}
            <CartWidget/>
        </ul>
 
        </nav>
}

export default NavBar