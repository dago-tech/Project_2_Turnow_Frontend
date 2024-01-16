import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import { TurnList } from "../UserAdmin/turn/TurnList";
import { DeskManage } from "./DeskManage";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getData, putData } from "../helpers/axios";
import BackButton from "../components/BackButton";
import { TurnCreateEdit } from "../UserAdmin/turn/TurnCreateEdit";
import { errorMessage } from "../helpers/errorMessage";

export function DeskMain() {
    /* Shows the desk user main page, a desk user will be able to call for a new turn 
    and mark when it has been attended */

    const { thisDesk, setThisDesk, setMessage, message, setThisDeskId } =
        useAuth();
    const [showModal, setShowModal] = useState(false);
    const restartTurnEndpoint = "turn/restart/";
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (token) {
            const tokenParts = JSON.parse(atob(token.split(".")[1]));

            getData(`desk/get_desk/${tokenParts.user_id}/`)
                .then((response) => {
                    const deskName = response.desk_name;
                    const deskId = response.desk_id;
                    setThisDesk(deskName);
                    setThisDeskId(deskId);
                    setMessage(response.message);
                })
                .catch((error) => {
                    setError(errorMessage(error));
                });
        } else {
            setError("Incorrect user login");
        }
    }, []);

    const restartTurn = () => {
        setShowModal(true);
    };

    const handleConfirm = () => {
        putData(restartTurnEndpoint)
            .then(() => {
                setShowModal(false);
            })
            .catch((error) => {
                setError(errorMessage(error));
            });
        
    };

    const handleCancel = () => {
        setShowModal(false);
    };

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
                            <Link to="/user_desk/turn">Turns List</Link>
                        </li>
                        <li>
                            <Link to="/notification">Turn notification</Link>
                        </li>
                        <br />
                        <li>
                            <Link to="/logout">Logout</Link>
                        </li>
                        <br />
                        <li>
                            <button onClick={restartTurn}>
                                Restart turn number
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div style={{ flex: 5, marginRight: "5vw" }}>
                <BackButton />
                {error && <p className="error">{error}</p>}
                {message == "desk_name" ? (
                    <>
                        <p>You are assigned to service desk: {thisDesk}</p>
                        <Routes>
                            <Route path="*" element={<DeskManage />} />
                            <Route path="/turn" element={<TurnList />} />
                            <Route
                                path="/turn/edit/:id"
                                element={<TurnCreateEdit edit={true} />}
                            />
                        </Routes>
                    </>
                ) : (
                    <>
                        <p>You are not assigned to any service desk.</p>
                        <Routes>
                            <Route path="/turn" element={<TurnList />} />
                        </Routes>
                    </>
                )}
            </div>
            <div>
                {/*Overlay is a visual layer that is overlaid on top of the main content 
                of the page or application when the modal is displayed. */}
                <Modal
                    isOpen={showModal}
                    contentLabel="Restart turn"
                    className="modal-content"
                    overlayClassName="modal-overlay"
                >
                    <p>¿Do you want to restart the turn number sequence?</p>
                    <button onClick={handleConfirm}>Accept</button>
                    <button onClick={handleCancel}>Cancel</button>
                </Modal>
            </div>
        </div>
    );
}
