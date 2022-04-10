import './App.css';
import NavBar from './Component/NavBar.js'
import ItemListContainer from './Component/ItemListContainer/ItemListContainer'
import ItemListDetail from './Component/ItemDetailContainer/ItemDetailContainer';


function App() {
  return (
    <div className="App">
      <NavBar/>
      <ItemListContainer greeting="Productos"/>
      <ItemListDetail/>
    </div>
  );
}

export default App;
