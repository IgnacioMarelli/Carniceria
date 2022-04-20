import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({onAdd, stock}) => {
    const [count, setCount] = useState(0);
    //const [agrego, setAgrego] = useState(false);

    const decrement= () =>{
        setCount(count-1);
    }
    if (count<0) {
        setCount(0);
        //setAgrego(false)
    }
    const increment= () =>{
        if (count<stock) {
           setCount(count+1)
           
        }
    }
    //const cambiar=()=>{
    //    setAgrego(true);
    //}
    //if (agrego) {
        return(
            <div className='cantidadDiv'>
                <button className='cantidadBtn mr-2' onClick={decrement}>-</button>
                <span>{count}</span>
                <button className='cantidadBtn ml-2' onClick={increment}>+</button>
                <button className='third' onClick={()=>onAdd(count)}> Agregar al carrito</button>
            </div>
        )
    //}else{
    //    return(
    //        <button className='third' onClick={cambiar}> Agregar al carrito</button>
    //}

}

export default ItemCount