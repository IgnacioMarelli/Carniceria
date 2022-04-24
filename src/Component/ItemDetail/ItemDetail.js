import ItemCount from "../ItemCount/ItemCount"
import { useContext} from "react"
import { Link } from 'react-router-dom'
import CartContext from "../context/CartContext"

const ItemDetail = ({id, img, name, price, category, stock}) => {
    const {addItem, isInCart}= useContext(CartContext)
    const handleOnAdd = (count)=>{
        const productObj={
            id,name,price,img
        }
        addItem({...productObj, quantity:count})
    }
    
    return(
        <section>
            <div className='item_image'>
                <img className='productoImagen' src={img} alt={name}/>
            </div>
            <div className='productoNombre'>
                <h2 className="nombre">{name}</h2>
                <h2 className="nombre">Tipo de carne:{category}</h2>
                <h2 className="nombre">Stock:{stock}kg</h2>
                <div className='counterDiv'>{isInCart(id) > 0 ? <Link to ='/Cart'>Ir al Carrito</Link> : <ItemCount onAdd={handleOnAdd} stock={stock}/>}</div>
            </div>
        </section>
    )
}

export default ItemDetail