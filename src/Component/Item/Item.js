import ItemCount from "../ItemCount/ItemCount"

const Item = ({name, img}) => {
    return(
        <section>
            <div className='item_image'>
                <img className='productoImagen' src={img} alt={name}/>
            </div>
            <div className='productoNombre'>
                <h2 className="nombre">{name}</h2>
                <div className='counterDiv'><ItemCount/></div>
            </div>
        </section>
        
    )
}

export default Item