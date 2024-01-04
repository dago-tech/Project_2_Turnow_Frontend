import { Link } from "react-router-dom";
import { Header } from "./Header";

export function Home() {
    /*Index  page, shows main application menu */
    return (
        <>
            <Header />

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
                    <button className="principal_button">Admin User</button>
                </Link>
                <br />
                <br />
                <Link to="/user_desk">
                    <button className="principal_button">Desk User</button>
                </Link>
            </div>
        </>
    );
}
