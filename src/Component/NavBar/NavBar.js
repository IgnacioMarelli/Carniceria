import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import CartContext from '../../context/CartContext'
import { useContext } from 'react'
import { getNavbar } from '../../service/firebase/firestore'
import { useAsync } from '../../hooks/customHook'

const NavBar = ()=> {
    const [categories, setCategories] =useState([])
    const [loading, setLoading] = useState(true)
    const {cart}= useContext(CartContext)

    useAsync(
        setLoading,
        ()=>getNavbar(),
        setCategories,
        ()=>console.log('error en la NavBar'),
        []
    )


    return <nav>
        <Link to={`/`} className='Logo'>Carnes Avenida</Link>
        <ul className='bg-dark' >
            {categories.map(cate=> <Link key={cate.id} to={`category/${cate.id}`}><li>{cate.description}</li></Link>)}
            {cart.length > 0 ? <Link to={`/Cart`}><CartWidget/></Link>: '¡Bienvenido!'}
        </ul>
 
        </nav>
}

export default NavBar