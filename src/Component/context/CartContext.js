import { createContext, useState } from "react";

const CartContext = createContext()

export const CartContextProvider = ({children, name, price})=>{
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

    const noRepetir=(prods, prodsRepetido)=>{
        prods.quantity+=prodsRepetido.quantinty
        removeItem(prodsRepetido.id)
    }

    
    
    const addItem=(productToAdd)=>{
        setCart([...cart, productToAdd])
        cart.forEach(prods=>{
            const prodsRepetido= cart.filter(producto => producto.id === prods)
            console.log(prodsRepetido)
            prodsRepetido? noRepetir(prods, prodsRepetido) : console.log(prods)
        })
    }
   //console.log(cart)
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