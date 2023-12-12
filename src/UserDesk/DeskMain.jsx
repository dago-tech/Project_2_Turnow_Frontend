import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { TurnList } from "../UserAdmin/turn/TurnList";
import { DeskManage } from "./DeskManage";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { getData } from "../helpers/axios";
import BackButton from "../components/BackButton";

export function DeskMain() {

    const { thisDesk, setThisDesk, setMessage, message, setThisDeskId } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (token) {
            const tokenParts = JSON.parse(atob(token.split(".")[1]));

            getData(`desk/get_desk/${tokenParts.user_id}/`).then((response)=>{
                console.log(response)
                const deskName = response.desk_name
                const deskId = response.desk_id
                setThisDesk(deskName)
                setThisDeskId(deskId)
                setMessage(response.message)
            }
            ).catch((error) => {
                console.log('Error')
            });
        }
        else {
            setMessage('Incorrect user login')
        }
    }, []);

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1, textAlign: "center" }}>
                <h2>Desk menu</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/user_desk">Turn Management</Link>
                        </li>
                        <li>
                            <Link to="/user_desk/turn">Turns</Link>
                        </li>
                        <li>
                            <Link to="/user_desk/priority">
                                Turn number restart
                            </Link>
                        </li>
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div style={{ flex: 5, marginRight: "15vw" }}>
                <BackButton/>
                {message=='desk_name'? (
                    <>
                        <p>You are assigned to service desk: {thisDesk}</p>
                        <Routes>
                            <Route path="*" element={<DeskManage />} />
                            <Route path="/turn" element={<TurnList />} />
                        </Routes>
                    </>
                    
                ):(
                    <>
                        <p>You are not assigned to any service desk</p>
                        <Routes>
                            <Route path="/turn" element={<TurnList />} />
                        </Routes>
                    </>
                )}                
            </div>
        </div>
    );
}
