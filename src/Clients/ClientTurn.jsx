import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../context/ClientContext";
import { postData } from "../helpers/axios";
import "../styles/main.css";
import { errorMessage } from "../helpers/errorMessage";

export function ClientTurn() {
    /* Shows the resulting turn number, after this, client should wait until his call */

    const {
        idClient,
        idCategory,
        idPriority,
        setIdClient,
        setIdCategory,
        setIdPriority,
    } = useContext(ClientContext);

    const [turnNumber, setTurnNumber] = useState("");
    const [error, setError] = useState("");
    const endpoint = "turn/create/";
    const history = useNavigate();

    useEffect(() => {
        if (idClient == null || idCategory == null || idPriority == null) {
            setError("There was an error, please enter your data again");
            return;
        }
        // Clean Error if no validation issues
        setError("");

        const data = {
            personal_id: idClient,
            category: idCategory,
            priority: idPriority,
        };

        postData(endpoint, data)
            .then((response) => {
                setTurnNumber(response.turn_number);
                setError(null);
            }).catch((error) => {
                setError(errorMessage(error));
            });

        setIdClient(null);
        setIdCategory(null);
        setIdPriority(null);
    }, []);

    const handleSubmit = () => {
        history({
            pathname: "/client/",
        });
    };

    return (
        <>
            <div className="center">
                <h1>Your turn number is:</h1>

                <div className="turn">
                    <p style={{ margin: "auto" }}>{turnNumber}</p>
                </div>
                {error && <p className="error">{error}</p>}
            </div>

            <div style={{ textAlign: "right" }}>
                <button className={"next_button"} onClick={handleSubmit}>
                    Finish
                </button>
            </div>
        </>
    );
}
