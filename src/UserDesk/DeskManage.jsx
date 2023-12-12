import { VerifyTurn } from "./VerifyTurn";
import { NextTurn } from "./NextTurn";
import { ServedTurn } from "./ServedTurn";
import { useEffect, useState } from "react";
import { TurnProvider } from "../context/ManageTurnContext";
import { getData } from "../helpers/axios";
import "../styles/main.css";
import { useAuth } from "../context/AuthContext";


export function DeskManage() {
    const initialMessage = {
        text: "",
        style: "error",
    };

    const [message, setMessage] = useState(initialMessage);
    const { thisDeskId } = useAuth();

    useEffect(() => {
        
        const checkTurn = () => {
            getData(`turn/check/${thisDeskId}`)
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

        const intervalId = setInterval(checkTurn, 10000);

        //Clear interval when component unmounted
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="center">
            <h1>Turn Management</h1>
            {message && <p className={message.style}>{message.text}</p>}
            <div className="turn_manage">
                <TurnProvider>
                    <NextTurn />
                    <VerifyTurn />
                    <ServedTurn />
                </TurnProvider>
            </div>
        </div>
    );
}
