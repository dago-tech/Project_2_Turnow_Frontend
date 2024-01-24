import { useContext, useState } from "react";
import { putData } from "../../helpers/axios";
import TurnContext from "../context/ManageTurnContext";
import { useWebSocket } from "../context/WebSocketContext";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../../helpers/errorMessage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import NotificationsIcon from '@mui/icons-material/Notifications';
import "../../styles/main.css";

export function NextTurn() {
    /*Renders a button which allows to call for a new turn based on priority, category
    and creation time */

    const { nextMessage, setNextMessage, setVerifyMessage, setServedMessage } =
        useContext(TurnContext);
    const { thisDeskId } = useAuth();
    const [error, setError] = useState("");
    const endpoint = `turn/serve/${thisDeskId}/`;

    const { sendMessage } = useWebSocket();

    const defaultMessage = {
        message: "Waiting",
        style: "default",
    };
    const successMessage = {
        message: "One turn has been required",
        style: "success",
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: "#34495E",
            },
        },
    });

    //Update Turn Notification Table
    const webSocketMessage = () => {
        sendMessage(
            "This message is used to trigger onmessage webSocket method"
        );
    };

    const handleSubmit = () => {
        putData(endpoint)
            .then(() => {
                setNextMessage(successMessage);
                setVerifyMessage(defaultMessage);
                setServedMessage(defaultMessage);
                webSocketMessage();
                setError(null);
            })
            .catch((error) => {
                setNextMessage(null);
                setVerifyMessage(defaultMessage);
                setServedMessage(defaultMessage);
                setError(errorMessage(error));
            });
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    size="small"
                    endIcon={<NotificationsIcon />}
                >
                    Call The Next Turn
                </Button>

                <div>
                    <h4>Message: </h4>
                    {/* <button onClick={webSocketMessage}>Send Message</button> */}
                    {nextMessage && (
                        <p className={nextMessage.style}>{nextMessage.message}</p>
                    )}
                    {error && <p className="error">{error}</p>}
                </div>
            </ThemeProvider>
        </div>
    );
}
