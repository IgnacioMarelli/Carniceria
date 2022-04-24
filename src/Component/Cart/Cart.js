import { useContext } from "react"
import CartContext from "../context/CartContext"
import { Link } from "react-router-dom"
import './Cart.css'
const Cart = () =>{
    const {cart, removeItem, clearCart} = useContext(CartContext)

    if(cart.length === 0) {
        return (
            <>
                <h1>No hay productos</h1>
                <Link to={`/`}><div className="cartVacio"><button className='third letraCartVacio'> Inicio</button></div></Link>
            </>
        )
    }
    return (
        <>
            <h1>Cart</h1>
            <div>
                {
                    cart.map(prod=><section key={prod.id}>
                        <div className='item_image'>
                            <img className='productoImagen' src={prod.img} alt={prod.name}/>
                        </div>
                        <div className='productoNombre'>
                            <h2 className="nombre">{prod.name}</h2>
                            <div className='counterDiv'>{prod.quantity}kg</div>
                            <h2>Precio Unidad: {prod.price}</h2>
                            <h2>Subtotal: {prod.price*prod.quantity}</h2>
                        </div>
                        <button className="third" onClick={()=>removeItem(prod.id)}>X</button>
                    </section>)
                }
                <div className="cartVacio"><button className="third" onClick={()=>clearCart()}>Vaciar Carrito</button></div>
            </div>
        </>
    )

}

export default Cart