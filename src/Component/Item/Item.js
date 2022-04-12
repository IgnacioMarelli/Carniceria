import ItemCount from "../ItemCount/ItemCount"
import { Link } from "react-router-dom"
const Item = ({id, name, img}) => {
    return(
        <section>
            <div className='item_image'>
                <img className='productoImagen' src={img} alt={name}/>
            </div>
            <div className='productoNombre'>
                <h2 className="nombre">{name}</h2>
                <Link to={`/detail/${id}`}><h2 className="nombre">Ver detalle</h2></Link>
                <div className='counterDiv'><ItemCount/></div>
            </div>
        </section>
    )
}

export default Item