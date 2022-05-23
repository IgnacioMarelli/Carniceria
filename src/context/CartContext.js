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
    
    const addItem=(productToAdd, quantity)=>{
        if (!isInCart(productToAdd.id)) {
            setCart([...cart, productToAdd])
        } else {
            const prodsRepetido= cart.map(prod=>{
                if (prod.id === productToAdd.id) {
                    const prodRepetido= {
                        ...prod,
                        quantity:quantity
                    }
                    return prodRepetido
                } else {
                    return prod
                }
            })
            setCart(prodsRepetido)
        }
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