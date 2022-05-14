import { getDocs, writeBatch, query, where, collection, documentId, addDoc} from 'firebase/firestore' 
import { firestoreDb } from '../../service/firebase'
import { useContext, useState } from 'react'
import CartContext from "../context/CartContext"

const Form = ()=>{    
    const {cart, getTotal, clearCart} = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const [datos, setDatos] = useState('')
    const [botonDeshabilitado, setBotonDeshabilitado] = useState(true)

    const handleSubmit =(e)=>{
        e.preventdefault()
    }
    const handleOnBlur = () =>  {
        if (datos.confirmacion !== datos.mail ) {
            alert('Debe confirmar el mail correctamente')
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDatos(vals => ({ ...vals, [name]: value }))
        if (value=='') {
            setBotonDeshabilitado(true)
        }else{
            setBotonDeshabilitado(false)
        }
    }
    const crearOrden= ()=>{     

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
                        const pedidoCollectionRef = collection(firestoreDb, 'pedidos')
                        return addDoc(pedidoCollectionRef, objPedido)
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
            <form className="container" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" aria-describedby="emailHelp" name="mail" onChange={handleChange} placeholder="email@hotmail.com"/>
            </div>
            <div className="form-group">
                <label>Confirma Email</label>
                <input type="email" className="form-control"  aria-describedby="emailHelp" name="confirmacion" onChange={handleChange} onBlur={handleOnBlur} placeholder="email@hotmail.com"/>
            </div>
            <div className="form-group">
                <label >Nombre</label>
                <input type="text" className="form-control" placeholder="Nombre" name="nombre" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label >Teléfono</label>
                <input type="number" className="form-control" name="tel" placeholder="Teléfono"  onChange={handleChange}/>
            </div>
            {botonDeshabilitado ? <h2>Por favor complete los datos</h2> : <div className="cartVacio"><button type="submit" className=" third btn btn-primary" onClick={crearOrden}>Comprar</button></div>}
            </form>
        </>
    )
}

export default Form