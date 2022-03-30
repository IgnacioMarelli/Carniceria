import './App.css';
import NavBar from './Component/NavBar.js'
import ItemListContainer from './Component/ItemListContainer/ItemListContainer'
import Counter from './Counter';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ItemListContainer greeting="Productos"/>
      <div className='divProducto container'>
        <div className='item_image'>
          <img className='productoImagen' src="./Media/asado.png"/>
        </div>
        <div className='productoNombre'>
          <h2>Tira de Asado (1 kg.)</h2>
          <div className='counterDiv'><Counter/></div>
        </div>
      </div>
    </div>
  );
}

export default App;
