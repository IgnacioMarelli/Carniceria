import './App.css';
import NavBar from './Component/NavBar.js'
import ItemListContainer from './Component/ItemListContainer/ItemListContainer'
import ItemListDetail from './Component/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <NavBar/>
      <Routes>
       <Route exact path='/' element={<ItemListContainer greeting="Productos"/>}/>
       <Route exact path='/category/:category' element={<ItemListContainer greeting="Productos"/>}/>
       <Route exact path='/detail/:productId' element={ <ItemListDetail/>}/>
       <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
