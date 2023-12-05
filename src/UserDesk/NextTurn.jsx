import { putData } from "../helpers/axios";
import { useContext } from "react";
import TurnContext from "../context/ManageTurnContext";
import "../styles/main.css";
import { useWebSocket } from "../context/WebSocketContext";

export function NextTurn() {
    const endpoint = "turn/serve/1/";
    const { nextMessage, setNextMessage, setVerifyMessage, setServedMessage } =
        useContext(TurnContext);

    const { sendMessage } = useWebSocket();

    const defaultMessage = {
        message: "Waiting",
        style: "default",
    };
    const successMessage = {
        message: "One turn has been required",
        style: "success",
    };
    const errorMessage = {
        message: "There are no pending turns",
        style: "error",
    };

    //Update Turn Notification Table
    const webSocketMessage = () => {
        sendMessage(
            "This message is used to trigger onmessage webSocket method"
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        putData(endpoint)
            .then(() => {
                setNextMessage(successMessage);
                setVerifyMessage(defaultMessage);
                setServedMessage(defaultMessage);
            })
            .catch(() => {
                setNextMessage(errorMessage);
            });
    };

    return (
        <div>
            <button className="principal_button" onClick={handleSubmit}>
                Call Next Turn
            </button>
            <div>
                <h4>Message: </h4>
                <button onClick={webSocketMessage}>Send Message</button>
                <br />
                <p className={nextMessage.style}>{nextMessage.message}</p>
            </div>
        </div>
    );
}
