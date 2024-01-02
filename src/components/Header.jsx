import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import "../styles/main.css";

export function Header() {

    const { isAuthenticated, isAdmin, userEmail } = useAuth();

    const message1 = `You are logged as: ${userEmail}`
    const message2 = `You are not logged`
    console.log(isAuthenticated)

    return (
        <div className="my-header">
            <div>
                {isAuthenticated ? (
                    <p>{message1}</p>
                ):(
                    <p>{message2}</p>
                )}
            </div>

            <div>
                <ul className="header-list">
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}