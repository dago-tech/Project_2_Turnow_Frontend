import { useState } from "react";
import { useContext } from "react";
import TurnContext from "../context/ManageTurnContext";
import { useWebSocket } from "../context/WebSocketContext";
import { putData } from "../helpers/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/main.css";

export function VerifyTurn() {
    
    const { verifyMessage, setVerifyMessage, setServedMessage } = useContext(TurnContext);
    const { sendMessage } = useWebSocket();
    const { thisDeskId } = useAuth();
    const endpoint = `turn/serving/${thisDeskId}/`;
    
    const defaultMessage = {
        message: "Waiting",
        style: "default",
    };
    const successMessage = {
        message: "Turn has been verified",
        style: "success",
    };
    const errorMessage = {
        message:
            "This turn number is not the first to serve for this service desk",
        style: "error",
    };

    const initialData = {
        turn_number: "",
    };

    const [data, setData] = useState(initialData);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {

        if (data.turn_number == "") {
            setError("¡Field is empty!");
            return;
        }
        // Clean Error if no validation issues
        setError("");

        putData(endpoint, data)
            .then(() => {
                setVerifyMessage(successMessage);
                setServedMessage(defaultMessage);
                setData(initialData);
                //Update Turn Notification Table
                sendMessage(
                    "This message is used to trigger onmessage webSocket method"
                );
            })
            .catch(() => {
                setVerifyMessage(errorMessage);
            });
    };

    const handleReset = (e) => {
        setData(initialData);
    };

    return (
        <div>
            <form>
                <label htmlFor="turn_number">Turn number: </label>
                <input
                    type="text"
                    name="turn_number"
                    onChange={handleChange}
                    value={data.turn_number}
                />
                <br />
                <br />
                <input type="reset" value="Clear" onClick={handleReset} />
                <br />
                <br />
                <input
                    className="principal_button"
                    type="button"
                    value="Verify Turn Number"
                    onClick={handleSubmit}
                />
            </form>
            <div>
                <h4>Message: </h4>
                <br />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <br />
                <p className={verifyMessage.style}>{verifyMessage.message}</p>
            </div>
        </div>
    );
}
