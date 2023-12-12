import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [thisDesk, setThisDesk] = useState('');
    const [thisDeskId, setThisDeskId] = useState(0);

    const data = {
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        userId,
        setUserId,
        message,
        setMessage,
        thisDesk,
        setThisDesk,
        thisDeskId,
        setThisDeskId
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);