import { useContext, useState } from "react";
import TurnContext from "../context/ManageTurnContext";
import { putData } from "../helpers/axios";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../helpers/errorMessage";

export function ServedTurn() {
    /* Mark current turn as served or attended */
    
    const { thisDeskId } = useAuth()
    const endpoint = `turn/served/${thisDeskId}/`;
    const [error, setError] = useState("");

    const {
        servedMessage,
        setServedMessage,
        setNextMessage,
        setVerifyMessage,
    } = useContext(TurnContext);

    const defaultMessage = {
        message: "Waiting",
        style: "default",
    };

    const successMessage = {
        message: 'Current turn has been marked as "served"',
        style: "success",
    };


    const handleSubmit = () => {

        putData(endpoint)
            .then(() => {
                setServedMessage(successMessage);
                setNextMessage(defaultMessage);
                setVerifyMessage(defaultMessage);
                setError(null);
            })
            .catch((error) => {
                setServedMessage(null);
                setError(errorMessage(error));
            });
    };

    return (
        <div>
            <button className="principal_button" onClick={handleSubmit}>
                Attention finished
            </button>

            <div>
                <h4>Message: </h4>
                {servedMessage && <p className={servedMessage.style}>{servedMessage.message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}
