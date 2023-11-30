import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ClientId } from "./ClientId";
import { ClientPriority } from "./ClientPriority";
import { ClientTurn } from "./ClientTurn";
import { ClientCategory } from "./ClientCategory";
import { ClientProvider } from '../context/ClientContext';


export function Clients() {
    const [idClient, setIdClient] = useState(null);
    const [idCategory, setIdCategory] = useState(null);
    const [idPriority, setIdPriority] = useState(null);

    const data = {
        idClient,
        setIdClient,
        idCategory,
        setIdCategory,
        idPriority,
        setIdPriority        
    };
  
    return (
  
        <ClientProvider value={data}>
            <h1>CLIENTS</h1>
            <Routes>
                <Route index element={<ClientId />} />                  
                <Route path="/priority" element={<ClientPriority />} />
                <Route path="/category" element={<ClientCategory />} />
                <Route path="/turn" element={<ClientTurn />} />
                {/* <Route path="*" element={<Error404 />} /> */}
            </Routes>
        </ClientProvider>
    )
}