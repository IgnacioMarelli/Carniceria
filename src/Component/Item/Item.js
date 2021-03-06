import ItemCount from "../ItemCount/ItemCount"
import { Link } from "react-router-dom"
import { useContext} from "react"
import CartContext from "../../context/CartContext"

const Item = ({id, name, img, stock, price}) => {
    const {addItem, isInCart, removeItem}= useContext(CartContext)
    const handleOnAdd = (count)=>{
        const productObj={
            id,name,price, img
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
                <Link to={`/detail/${id}`}><h2 className="nombre">Ver detalle</h2></Link>
                <div className='counterDiv'>{isInCart(id) >= 1 ? <div> <Link to ='/Cart'>Ir al Carrito</Link> <button className="third" onClick={()=>removeItem(id)}>Modificar Compra</button></div> : <ItemCount onAdd={handleOnAdd} stock={stock}/>}</div>
            </div>
        </section>
    )
}

export default Item