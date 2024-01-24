import { Routes, Route } from "react-router-dom";
import { ClientId } from "./ClientId";
import { ClientPriority } from "./ClientPriority";
import { ClientTurn } from "./ClientTurn";
import { ClientCategory } from "./ClientCategory";
import { ClientProvider } from "../context/ClientContext";

export function Clients() {
  /*Main conponent of Clients section */
  return (
    <>
      <ClientProvider>
        <Routes>
          <Route index element={<ClientId />} />
          <Route path="/priority" element={<ClientPriority />} />
          <Route path="/category" element={<ClientCategory />} />
          <Route path="/turn" element={<ClientTurn />} />
        </Routes>
      </ClientProvider>
    </>
  );
}
