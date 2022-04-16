import ItemCount from "../ItemCount/ItemCount"
import { useState} from "react"
import { Link } from 'react-router-dom'

const ItemDetail = ({img, name, category, stock}) => {
    const [quantity, setQuantity]= useState(0)
    
    
    const onAdd = (count)=>{
        setQuantity(count)
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
                <div className='counterDiv'>{quantity > 1 ? <Link to ='/cart'><h1>Ir al Carrito</h1></Link> : <ItemCount onAdd={onAdd} stock={stock}/>}</div>
            </div>
        </section>
    )
}

export default ItemDetail