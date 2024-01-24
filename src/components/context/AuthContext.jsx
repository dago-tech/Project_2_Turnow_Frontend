import React, { createContext, useContext, useEffect, useState } from "react";
import { checkAuthentication } from "../../helpers/checkAuth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /* Context provider of authentication variables and it checks if user is
    authenticated and an admin */

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
        setIsAuthenticated(response.authenticated);
        setIsAdmin(response.isAdmin);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsAdmin(false);
      });

    setUserEmail(Cookies.get("userEmail") || null);
  }, []);

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
