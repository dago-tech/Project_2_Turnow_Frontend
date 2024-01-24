import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "../styles/main.css";

export function Header() {
  /*User authentication information and Login-Logout links*/

  const { isAuthenticated, isAdmin, userEmail } = useAuth();

  const condition1 = isAuthenticated && isAdmin;
  const condition2 = isAuthenticated && !isAdmin;
  const condition3 = !isAuthenticated;
  const message1 = `You are logged as: ${userEmail} (Admin User)`;
  const message2 = `You are logged as: ${userEmail} (Desk User)`;
  const message3 = `You are not logged`;

  return (
    <div className="my-header">
      <div>
        {condition1 && <p>{message1}</p>}
        {condition2 && <p>{message2}</p>}
        {condition3 && <p>{message3}</p>}
      </div>

      <div>
        <ul className="header-list">
          {condition3 ? (
            <li>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
