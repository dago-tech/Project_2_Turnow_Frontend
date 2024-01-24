import { createContext, useContext, useEffect, useRef, useState } from "react";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    /* Context provider of a webSocket instance. Makes a change in notificationChange
    variable when there is a new called turn or when a turn has been attended */
    
    const [notificationChange, setNotificationChange] = useState(false);
    //It maintains its value between renders and page reloads.
    const socketRef = useRef(null);


    useEffect(() => {

        socketRef.current = new WebSocket("ws://localhost:8000/ws/turnow/");

        socketRef.current.onmessage = () => {
            /* "setState" can receive a function as an argument */
            setNotificationChange((prevToggleState) => !prevToggleState);
        };

        return () => {
            socketRef.current.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(message);
        }
    };

    const value = {
        sendMessage,
        notificationChange,
        setNotificationChange,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};
