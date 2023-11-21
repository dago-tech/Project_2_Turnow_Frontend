import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { UsersList } from "./user/UsersList";
import { CategoriesList } from "./category/CategoriesList";
import { PrioritiesList } from "./priority/PrioritiesList";
import { DesksList } from "./desk/DesksList";
import { TurnList } from "./turn/TurnList";
import { CategoriesEdit } from "./category/CategoriesEdit";
import { CategoriesCreate } from "./category/CategoriesCreate";

export function AdminMain() {
    //const [count, setCount] = useState(0)
  
    return (
        <>  
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h2>Admin menu</h2>
                    <nav>
                        <ul>
                            <li><Link to="/users/admin/users">Users</Link></li>
                            <li><Link to="/users/admin/categories">Categories</Link></li>
                            <li><Link to="/users/admin/priorities">Priorities</Link></li>
                            <li><Link to="/users/admin/desks">Services desk</Link></li>
                            <li><Link to="/users/admin/turns">Turns</Link></li>
                            <br />
                            <li><Link to="/notification">Turn notification</Link></li>
                            <br />
                            <li><Link to="/users/admin/reports">Reports</Link></li>
                        </ul>
                    </nav>
                </div>

                <div style={{ flex: 2, marginLeft: '20px' }}>
                    <Routes>                    
                        <Route path="/users" element={<UsersList />} />
                        <Route path="/categories" element={<CategoriesList />} />
                        <Route exact path="/categories/edit/:id" element={<CategoriesEdit/>} />
                        <Route exact path="/categories/create" element={<CategoriesCreate/>} />
                        <Route path="/priorities" element={<PrioritiesList />} />
                        <Route path="/desks" element={<DesksList />} />
                        <Route path="/turns" element={<TurnList />} />
                    </Routes>
                </div>
                
            </div>
        </>
    )
}