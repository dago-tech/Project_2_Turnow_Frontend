import { TurnProvider } from "../context/ManageTurnContext";
import { VerifyTurn } from "./VerifyTurn";
import { NextTurn } from "./NextTurn";
import { ServedTurn } from "./ServedTurn";
import { useEffect, useState } from "react";
import { getData } from "../helpers/axios";
import "../styles/main.css";

export function DeskManage() {
    const initialMessage = {
        text: "",
        style: "error",
    };
    const [message, setMessage] = useState(initialMessage);

    useEffect(() => {
        const checkTurn = () => {
            getData("turn/check/1")
                .then((response) => {
                    if (response.state) {
                        setMessage({
                            text: response.message,
                            style: "success",
                        });
                    } else {
                        setMessage({ text: response.message, style: "error" });
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        };

        checkTurn();

        const intervalId = setInterval(checkTurn, 30000);

        // Clear interval when component unmounted
        return () => clearInterval(intervalId);
    }, []);

    return (
        <TurnProvider>
            <div className="center">
                <h1>Turn Management</h1>

                {message && <p className={message.style}>{message.text}</p>}
                <div className="turn_manage">
                    <NextTurn />
                    <VerifyTurn />
                    <ServedTurn />
                </div>
            </div>
        </TurnProvider>
    );
}
