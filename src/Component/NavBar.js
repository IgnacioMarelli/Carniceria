import './NavBar.css';
import CartWidget from './CartWidget/CartWidget';

const NavBar = ()=> {
    return <nav>
        <a className='Logo'>Carnes Avenida</a>
        <ul >
            <a><li>Ternera</li></a>
            <a><li>Cerdo</li></a>
            <a><li>Embutido</li></a>
            <a><li>Achuras</li></a>
            <CartWidget/>
        </ul>
 
        </nav>
}

export default NavBar