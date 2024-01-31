import "../../styles/main.css";
import "../../styles/userAdmin.css"

export function AdminHome() {
  /*Home message in admin nain page*/

  return (
    <div className="admin-home">
      <p>
        Here you have an administration console to setup your Turnow
        Application, create and delete users, categories, priorities and service
        desks...
      </p>
    </div>
  );
}
