import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Principal } from "./Principal";
import { Notification } from "./Notification/Notification";
import { Clients } from "./Clients/Clients";
import { Error404 } from "./components/Error404";
import { DeskMain } from "./UserDesk/DeskMain";
import { AdminMain } from "./UserAdmin/AdminMain";
import { ClientProvider } from './context/ClientContext';



function App() {

    const [idClient, setIdClient] = useState(null);
    const [idCategory, setIdCategory] = useState(null);
    const [idPriority, setIdPriority] = useState(null);
    const [notificationChange, setNotificationChange] = useState('');

    const data = {
        idClient,
        setIdClient,
        idCategory,
        setIdCategory,
        idPriority,
        setIdPriority,
        notificationChange,
        setNotificationChange
    };

    return (
        <>
            <ClientProvider value={data}>
                <BrowserRouter>		
                    <Routes>
                        <Route exact path="/" element={<Principal/>} />
                        <Route path="/notification" element={<Notification/>}/>
                        <Route path="/client/*" element={<Clients/>}/>
                        <Route path="/user_admin/*" element={<AdminMain />}/>
                        <Route path="/user_desk/*" element={<DeskMain />}/>
                        {/* <Route path="*" element={<Error404/>} /> */}
                    </Routes>
                </BrowserRouter>
            </ClientProvider>
        </>
    )
}

export default App
