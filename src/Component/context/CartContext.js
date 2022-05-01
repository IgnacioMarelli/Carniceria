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
    const getTotal = ()=>{
        let total = 0
        cart.forEach(prod => {
            total += prod.quantity * prod.price
        })
        
        return total
    }

    return(
        <CartContext.Provider value={{cart, isInCart, removeItem, addItem, getQuantity, clearCart, getTotal}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext