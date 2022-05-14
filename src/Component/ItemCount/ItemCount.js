import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({onAdd, stock}) => {
    const [count, setCount] = useState(0);

    const decrement= () =>{
        setCount(count-1);
    }
    if (count<0) {
        setCount(0);
    }
    const increment= () =>{
        if (count<stock) {
           setCount(count+1)
           
        }
    }

        return(
            <div className='cantidadDiv'>
                <button className='cantidadBtn mr-2' onClick={decrement}>-</button>
                <span>{count}</span>
                <button className='cantidadBtn ml-2' onClick={increment}>+</button>
                {count? <button className='third' onClick={()=>onAdd(count)}> Agregar al carrito</button> : <h3>Selecciona la cantidad</h3>}
            </div>
        )

}

export default ItemCount