import { useState } from "react";
import { useContext } from "react";
import TurnContext from "../context/ManageTurnContext";
import { useWebSocket } from "../context/WebSocketContext";
import { putData } from "../helpers/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/main.css";
import { errorMessage } from "../helpers/errorMessage";

export function VerifyTurn() {
    /*Renders an input text to enter client's turn in order to validate if it is the same
    that desk user had called previously */

    const {
        verifyMessage,
        setNextMessage,
        setVerifyMessage,
        setServedMessage,
    } = useContext(TurnContext);
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

    const initialData = {
        turn_number: "",
    };

    const [data, setData] = useState(initialData);
    const [error, setError] = useState("");

    //Update Turn Notification Table
    const webSocketMessage = () => {
        sendMessage(
            "This message is used to trigger onmessage webSocket method"
        );
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
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
                webSocketMessage();
                setError(null);
            })
            .catch((error) => {
                setVerifyMessage(null);
                setNextMessage(defaultMessage);
                setServedMessage(defaultMessage);
                setError(errorMessage(error));
            });
    };

    const handleReset = () => {
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
                {verifyMessage && (
                    <p className={verifyMessage.style}>
                        {verifyMessage.message}
                    </p>
                )}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}
