import { createContext, useState } from "react";

const CartContext = createContext()

export const CartContextProvider = ({children})=>{
    const [cart, setCart]= useState([])
    const clearCart=()=>{
        setCart([])
    }

    const removeItem = (id)=>{
        const products = cart.filter(prod=> prod.id!==id)
        setCart(products)
    }
    const isInCart=(id)=>{
        return cart.some(prod=> prod.id === id)
    }    
    
    const addItem=(productToAdd)=>{
        if (!isInCart(productToAdd.id)) {
            setCart([...cart, productToAdd])
        } else {
            const prodsRepetido= cart.filter(producto => producto.id === productToAdd.id)
            prodsRepetido.quantinty += productToAdd.quantinty
            const newCart = [...cart];
            setCart(newCart);
        }
        console.log(cart)
    }

    const getQuantity= ()=>{
        let count = 0
        cart.forEach(prod => {count += prod.quantity})
        return count
    }

    return(
        <CartContext.Provider value={{cart, isInCart, removeItem, addItem, getQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext