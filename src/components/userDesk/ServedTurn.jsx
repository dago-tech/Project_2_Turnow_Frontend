import { useContext, useState } from "react";
import TurnContext from "../context/ManageTurnContext";
import { putData } from "../../helpers/axios";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../../helpers/errorMessage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";

export function ServedTurn() {
    /* Mark current turn as served or attended */

    const { thisDeskId } = useAuth();
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

    const theme = createTheme({
        palette: {
            primary: {
                main: "#34495E",
            },
        },
    });

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
            <ThemeProvider theme={theme}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    size="small"
                    endIcon={<CheckIcon />}
                >
                    Attention finished
                </Button>

                <div>
                    <h4>Message: </h4>
                    {servedMessage && (
                        <p className={servedMessage.style}>
                            {servedMessage.message}
                        </p>
                    )}
                    {error && <p className="error">{error}</p>}
                </div>
            </ThemeProvider>
        </div>
    );
}
