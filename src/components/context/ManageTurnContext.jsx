import { createContext, useState } from "react";

const TurnContext = createContext();

export const TurnProvider = ({ children }) => {
  /* Context provider of turn information when a desk user is attending a pending turn */

  const initialMessage = {
    message: "Waiting",
    style: "default",
  };

  const [nextMessage, setNextMessage] = useState(initialMessage);
  const [verifyMessage, setVerifyMessage] = useState(initialMessage);
  const [servedMessage, setServedMessage] = useState(initialMessage);

  const data = {
    nextMessage,
    setNextMessage,
    verifyMessage,
    setVerifyMessage,
    servedMessage,
    setServedMessage,
  };

  return <TurnContext.Provider value={data}>{children}</TurnContext.Provider>;
};

export default TurnContext;
