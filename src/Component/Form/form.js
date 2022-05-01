import { getDocs, writeBatch, query, where, collection, documentId, addDoc} from 'firebase/firestore' 
import { firestoreDb } from '../../service/firebase'
import { useContext, useState } from 'react'
import CartContext from "../context/CartContext"

const Form = ()=>{    
    const {cart, getTotal, clearCart} = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const [datos, setDatos] = useState('')

    const handleSubmit =(e)=>{
        e.preventdefault()
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDatos(vals => ({ ...vals, [name]: value }))
    }
    const crearOrden= ()=>{     

            setDatos(false)
            setLoading(true)
            const objPedido ={
                items: cart,
                buyer:datos,
                total: getTotal(),
                date: new Date()
            }

            const ids = cart.map(prod => prod.id)

            const batch = writeBatch(firestoreDb)

            const collectionRef= collection(firestoreDb, 'products')

            const sinStock= []

            getDocs(query(collectionRef, where(documentId(), 'in', ids)))
                .then(response=>{
                    response.docs.forEach(doc =>{
                        const dataDoc = doc.data()
                        const prodQuantity = cart.find(prod => prod.id === doc.id)?.quantity
                        if(dataDoc.stock >= prodQuantity){
                            batch.update(doc.ref, {stock: dataDoc.stock - prodQuantity})
                        } else{
                            sinStock.push({id: doc.id, ...dataDoc})
                        }
                    })
                }).then(()=>{
                    if(sinStock.length=== 0){
                        const collectionRef = collection(firestoreDb, 'pedidos')
                        return addDoc(collectionRef, objPedido)
                    }else{
                        return Promise.reject()
                    }
                }).then(({id})=>{
                    batch.commit()
                    alert(`el id de su pedido es ${id}`)
                }).catch(error=>{
                    console.log(error)
                }).finally(()=>{
                    setLoading(false)
                })
                clearCart()
        }
    
    if(loading){
        return <h1>Generando pedido</h1>
    }
    return(
        <>
            <form className="cartVacio container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="mail" onChange={handleChange}  placeholder="email@hotmail.com"/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Nombre</label>
                <input type="text" className="form-control" placeholder="Nombre" name="nombre" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Teléfono</label>
                <input type="number" className="form-control" name="tel" placeholder="Teléfono"  onChange={handleChange}/>
            </div>
            <button type="submit" className=" third btn btn-primary" onClick={crearOrden}>Comprar</button>
            </form>
        </>
    )
}

export default Form