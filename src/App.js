import './App.css';
import NavBar from './Component/NavBar.js'
import ItemListContainer from './Component/ItemListContainer/ItemListContainer'
import ItemListDetail from './Component/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {CartContextProvider} from './Component/context/CartContext';

function App() {
  return (
    <div className="App">
      <CartContextProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
          <Route exact path='/' element={<ItemListContainer greeting="Productos"/>}/>
          <Route exact path='/category/:category' element={<ItemListContainer greeting="Productos"/>}/>
          <Route exact path='/detail/:productId' element={ <ItemListDetail/>}/>
          <Route path='*' element={<h1>Error 404</h1>} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
