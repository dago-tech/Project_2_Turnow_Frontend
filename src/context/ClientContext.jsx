import { createContext, useState } from "react";

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    /* Context provider of client information when he is creating a new turn */

    const [idClient, setIdClient] = useState(null);
    const [idCategory, setIdCategory] = useState(null);
    const [idPriority, setIdPriority] = useState(null);

    const data = {
        idClient,
        setIdClient,
        idCategory,
        setIdCategory,
        idPriority,
        setIdPriority,
    };
    return (
        <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
    );
};

export default ClientContext;
