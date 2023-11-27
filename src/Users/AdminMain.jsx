import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { UserList } from "./user/UserList";
import { CategoryList } from "./category/CategoryList";
import { PriorityList } from "./priority/PriorityList";
import { DeskList } from "./desk/DeskList";
import { TurnList } from "./turn/TurnList";
import { Error404 } from "../components/Error404";
import { ClientList } from "./client/ClientList";
import { CategoryCreateEdit } from "./category/CategoryCreateEdit";
import { PriorityCreateEdit } from "./priority/PriorityCreateEdit";
import { ClientCreateEdit } from "./client/ClientCreateEdit";
import { DeskCreateEdit } from "./desk/DeskCreateEdit";
import { UserCreateEdit } from "./user/UserCreateEdit";


export function AdminMain() {
  
    return (

        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <h2>Admin menu</h2>
                <nav>
                    <ul>
                        <li><Link to="/user/admin/user">Users</Link></li>
                        <li><Link to="/user/admin/category">Categories</Link></li>
                        <li><Link to="/user/admin/priority">Priorities</Link></li>
                        <li><Link to="/user/admin/desk">Services desk</Link></li>
                        <li><Link to="/user/admin/client">Clients</Link></li>
                        <li><Link to="/user/admin/turn">Turns</Link></li>
                        <br />
                        <li><Link to="/notification">Turn notification</Link></li>
                        <br />
                        <li><Link to="/user/admin/logout">Logout</Link></li>
                    </ul>
                </nav>
            </div>

            <div style={{ flex: 2, marginLeft: '20px' }}>
                <Routes>                    
                    <Route path="/user" element={<UserList />} />
                    <Route path="/user/edit/:id" element={<UserCreateEdit edit={true} />} />
                    <Route path="/user/create" element={<UserCreateEdit />} />
                    <Route path="/category" element={<CategoryList />} />
                    <Route exact path="/category/edit/:id" element={<CategoryCreateEdit edit={true} />} />
                    <Route path="/category/create" element={<CategoryCreateEdit />} />
                    <Route path="/priority" element={<PriorityList />} />
                    <Route path="/priority/edit/:id" element={<PriorityCreateEdit edit={true} />} />
                    <Route path="/priority/create" element={<PriorityCreateEdit />} />
                    <Route path="/desk" element={<DeskList />} />
                    <Route path="/desk/edit/:id" element={<DeskCreateEdit edit={true} />} />
                    <Route path="/desk/create" element={<DeskCreateEdit />} />
                    <Route path="/client" element={<ClientList />} />
                    <Route path="/client/create" element={<ClientCreateEdit />} />
                    <Route path="/client/edit/:id" element={<ClientCreateEdit edit={true} />} />
                    <Route path="/turn" element={<TurnList />} />
                    {/* <Route path="*" element={<Error404 />} /> */}
                </Routes>
            </div>                
        </div>

    )
}