import './App.css';
import NavBar from './Component/NavBar.js'
import ItemListContainer from './Component/ItemListContainer/ItemListContainer'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ItemListContainer greeting="Productos"/>
    </div>
  );
}

export default App;
