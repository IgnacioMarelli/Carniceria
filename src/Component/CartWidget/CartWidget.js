import './CartWidget.css'
import { useContext } from 'react'
import CartContext from '../context/CartContext'
const CartWidget = ()=>{
    const {getQuantity}=useContext(CartContext)
    return <div className="carrito">
        <img src= 'https://i.imgur.com/j4BixPN.png' alt="Carrito" className="carritoImg" />
        {getQuantity()}kg
    </div>
}
export default CartWidget