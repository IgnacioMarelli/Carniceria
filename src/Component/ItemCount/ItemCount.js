import { useState } from 'react'
import './ItemCount.css';

const ItemCount = () => {
    const [count, setCount] = useState(1);
    const [agrego, setAgrego] = useState(false);

    const decrement= () =>{
        setCount(count-1);
    }
    if (count<=0) {
        setCount(1);
        setAgrego(false)
    }
    const increment= () =>{
        setCount(count+1)
    }
    const cambiar=()=>{
        setAgrego(true);
    }
    if (agrego) {
        return(
            <div className='cantidadDiv'>
                <button className='cantidadBtn mr-2' onClick={decrement}>-</button>
                <span>{count}</span>
                <button className='cantidadBtn ml-2' onClick={increment}>+</button>
            </div>
        )
    }else{
        return(
            <button className='third' onClick={cambiar}> Agregar al carrito</button>
        )
    }

}

export default ItemCount