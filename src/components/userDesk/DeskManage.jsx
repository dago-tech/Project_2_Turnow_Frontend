import { useEffect, useState } from "react";
import { VerifyTurn } from "./VerifyTurn";
import { NextTurn } from "./NextTurn";
import { ServedTurn } from "./ServedTurn";
import { TurnProvider } from "../context/ManageTurnContext";
import { getData } from "../../helpers/axios";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../../helpers/errorMessage";
import "../../styles/main.css";

export function DeskManage() {
  /* Shows turn management components and checks for a new turns to attend */
  const initialMessage = {
    text: "",
    style: "error",
  };

  const [message, setMessage] = useState(initialMessage);
  const { thisDeskId } = useAuth();

  useEffect(() => {
    //Check for new turns (system call for a new client to serve when desk user press "Call")
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
          setError(errorMessage(error));
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
