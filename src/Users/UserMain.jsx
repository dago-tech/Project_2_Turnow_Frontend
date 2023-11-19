import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import { AdminMain } from "./AdminMain";
import { DeskMain } from "./DeskMain";

export function UserMain() {
    //const [count, setCount] = useState(0)
  
    return (
        <>            
            <h1>Users main page</h1>
            <nav>
                <ul>
                    <li><Link to="/users/login">Login</Link></li>
                    <li><Link to="/users/admin">Admin user</Link></li>
                    <li><Link to="/users/desk">Service desk user</Link></li>
                </ul>
            </nav>
            <Routes>                    
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminMain />}/>
                <Route path="/desk" element={<DeskMain />} />
            </Routes>

        </>
    )
}