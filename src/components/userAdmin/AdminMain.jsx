import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AdminHome } from "./AdminHome";
import { UserList } from "./user/UserList";
import { CategoryList } from "./category/CategoryList";
import { PriorityList } from "./priority/PriorityList";
import { DeskList } from "./desk/DeskList";
import { TurnList } from "./turn/TurnList";
import { ClientList } from "./client/ClientList";
import { CategoryCreateEdit } from "./category/CategoryCreateEdit";
import { PriorityCreateEdit } from "./priority/PriorityCreateEdit";
import { ClientCreateEdit } from "./client/ClientCreateEdit";
import { DeskCreateEdit } from "./desk/DeskCreateEdit";
import { UserCreateEdit } from "./user/UserCreateEdit";
import { TurnCreateEdit } from "./turn/TurnCreateEdit";
import BackButton from "../BackButton";
import StatsMain from "./stats/StatsMain";
import "../../styles/userAdmin.css"

export function AdminMain() {
  /* Shows the admin main page, an admin user will be able to create and edit registers of
    categories, priorities, users and turns */

  return (
    <div className="admin-container">
      <div className="admin-menu">
        <h3>Admin menu</h3>
        <aside className="left-menu">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/user_admin/user">Users</Link>
            </li>
            <li>
              <Link to="/user_admin/category">Categories</Link>
            </li>
            <li>
              <Link to="/user_admin/priority">Priorities</Link>
            </li>
            <li>
              <Link to="/user_admin/desk">Service desks</Link>
            </li>
            <li>
              <Link to="/user_admin/client">Clients</Link>
            </li>
            <li>
              <Link to="/user_admin/turn">Turn List</Link>
            </li>
            <br />
            <li>
              <Link to="/notification">Turn notification</Link>
            </li>
            <li>
              <Link to="/user_admin/stats">Statistics</Link>
            </li>
            <br />
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </aside>
      </div>
      <div className="admin-content-container">
        <BackButton />
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/user" element={<UserList />} />
          <Route
            path="/user/edit/:id"
            element={<UserCreateEdit edit={true} />}
          />
          <Route path="/user/create" element={<UserCreateEdit />} />
          <Route path="/category" element={<CategoryList />} />
          <Route
            exact
            path="/category/edit/:id"
            element={<CategoryCreateEdit edit={true} />}
          />
          <Route path="/category/create" element={<CategoryCreateEdit />} />
          <Route path="/priority" element={<PriorityList />} />
          <Route
            path="/priority/edit/:id"
            element={<PriorityCreateEdit edit={true} />}
          />
          <Route path="/priority/create" element={<PriorityCreateEdit />} />
          <Route path="/desk" element={<DeskList />} />
          <Route
            path="/desk/edit/:id"
            element={<DeskCreateEdit edit={true} />}
          />
          <Route path="/desk/create" element={<DeskCreateEdit />} />
          <Route path="/client" element={<ClientList />} />
          <Route path="/client/create" element={<ClientCreateEdit />} />
          <Route
            path="/client/edit/:id"
            element={<ClientCreateEdit edit={true} />}
          />
          <Route path="/turn" element={<TurnList />} />
          <Route path="/turn/create" element={<TurnCreateEdit />} />
          <Route
            path="/turn/edit/:id"
            element={<TurnCreateEdit edit={true} />}
          />
          <Route path="/stats" element={<StatsMain />} />

          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </div>
    </div>
  );
}
