import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { UserList } from "./user/UserList";
import { CategoryList } from "./category/CategoryList";
import { PriorityList } from "./priority/PriorityList";
import { DeskList } from "./desk/DeskList";
import { TurnList } from "./turn/TurnList";
import { CategoryEdit } from "./category/CategoryEdit";
import { CategoryCreate } from "./category/CategoryCreate";
import { PriorityEdit } from "./priority/PriorityEdit";
import { PriorityCreate } from "./priority/PriorityCreate";
import { Error404 } from "../components/Error404";
import { UserEdit } from "./user/UserEdit";
import { UserCreate } from "./user/UserCreate";
import { DeskCreate } from "./desk/DeskCreate";

export function AdminMain() {
  
    return (
        <>  
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <h2>Admin menu</h2>
                    <nav>
                        <ul>
                            <li><Link to="/user/admin/user">Users</Link></li>
                            <li><Link to="/user/admin/category">Categories</Link></li>
                            <li><Link to="/user/admin/priority">Priorities</Link></li>
                            <li><Link to="/user/admin/desk">Services desk</Link></li>
                            <li><Link to="/user/admin/turn">Turns</Link></li>
                            <br />
                            <li><Link to="/notification">Turn notification</Link></li>
                            <br />
                            <li><Link to="/user/admin/reports">Reports</Link></li>
                        </ul>
                    </nav>
                </div>

                <div style={{ flex: 2, marginLeft: '20px' }}>
                    <Routes>                    
                        <Route path="/user" element={<UserList />} />
                        <Route path="/user/edit/:id" element={<UserEdit />} />
                        <Route path="/user/create" element={<UserCreate />} />
                        <Route path="/category" element={<CategoryList />} />
                        <Route exact path="/category/edit/:id" element={<CategoryEdit />} />
                        <Route path="/category/create" element={<CategoryCreate />} />
                        <Route path="/priority" element={<PriorityList />} />
                        <Route path="/priority/edit/:id" element={<PriorityEdit />} />
                        <Route path="/priority/create" element={<PriorityCreate />} />
                        <Route path="/desk" element={<DeskList />} />
                        <Route path="/desk/edit/:id" element={<UserEdit />} />
                        <Route path="/desk/create" element={<DeskCreate />} />
                        <Route path="/turn" element={<TurnList />} />
                        {/* <Route path="*" element={<Error404 />} /> */}
                    </Routes>
                </div>
                
            </div>
        </>
    )
}