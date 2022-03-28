import './CartWidget.css';

const CartWidget = ()=>{
    return <div className="carrito">
        <img src={'./Media/carrito.png'} alt="Carrito" className="carritoImg" /><span className="carritoCantidad">0</span>
    </div>
}
export default CartWidget