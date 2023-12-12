import { Link } from "react-router-dom";

export function Home() {

    return (
        <>
            <header>
                <ul className="header-list">
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </header>
        
            <div style={{ textAlign: "center" }}>
                <h1 style={{ margin: "70px" }}>TURNOW</h1>

                <Link to="/client">
                    <button className="principal_button">Clients</button>
                </Link>
                <br />
                <br />
                <Link to="/notification">
                    <button className="principal_button">
                        Notification Screen
                    </button>
                </Link>
                <br />
                <br />
                <Link to="/user_admin">
                    <button className="principal_button">User - Admin</button>
                </Link>
                <br />
                <br />
                <Link to="/user_desk">
                    <button className="principal_button">User - Desk</button>
                </Link>
            </div>
        </>
    );
}
