import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookieValue } from "../helpers/cookies";
import { checkAuthentication } from "../helpers/checkAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [thisDesk, setThisDesk] = useState("");
    const [thisDeskId, setThisDeskId] = useState(0);

    const data = {
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        userId,
        setUserId,
        userEmail,
        setUserEmail,
        message,
        setMessage,
        thisDesk,
        setThisDesk,
        thisDeskId,
        setThisDeskId,
    };

    useEffect(() => {
        checkAuthentication()
            .then((response) => {
                console.log(response);
                setIsAuthenticated(response.authenticated);
            })
            .catch((error) => {
                setIsAuthenticated(false);
                setIsAdmin(false);
                console.log(error);
            });

        setUserEmail(getCookieValue("userEmail") || null);
    }, []);

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
