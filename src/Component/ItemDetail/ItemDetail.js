import ItemCount from "../ItemCount/ItemCount"

const ItemDetail = ({img, name, category, stock}) => {
    return(
        <section>
            <div className='item_image'>
                <img className='productoImagen' src={img} alt={name}/>
            </div>
            <div className='productoNombre'>
                <h2 className="nombre">{name}</h2>
                <h2 className="nombre">Tipo de carne:{category}</h2>
                <h2 className="nombre">Stock:{stock}kg</h2>
                <div className='counterDiv'><ItemCount/></div>
            </div>
        </section>
    )
}

export default ItemDetail