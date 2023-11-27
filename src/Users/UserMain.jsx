import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import { AdminMain } from "./AdminMain";
import { DeskMain } from "./DeskMain";
import { Error404 } from "../components/Error404";

export function UserMain() {
    //const [count, setCount] = useState(0)
  
    return (
        <>            
            <h1>Users main page</h1>
            <nav>
                <ul>
                    <li><Link to="/user/login">Login</Link></li>
                    <li><Link to="/user/admin">Admin user</Link></li>
                    <li><Link to="/user/desk">Service desk user</Link></li>
                </ul>
            </nav>
            <Routes>                    
                <Route path="/login" element={<Login />} />
                <Route path="/admin/*" element={<AdminMain />}/>
                <Route path="/desk" element={<DeskMain />} />
                {/* <Route path="*" element={<Error404 />} /> */}
            </Routes>

        </>
    )
}