import { Link } from 'react-router-dom';

export function Principal() {
    //const [count, setCount] = useState(0)
  
    return (
        <>            
            <h1>TURNOW</h1>
            {/* Botones de navegación con el componente Link */}
            <Link to="/clients">
                <button>Clients</button>
            </Link>
            <br />
            <br />
            <Link to="/notification">
                <button>Notification Screen</button>
            </Link>
            <br />
            <br />
            <Link to="/users">
                <button>Users - Admin</button>
            </Link>
        </>
    )
}