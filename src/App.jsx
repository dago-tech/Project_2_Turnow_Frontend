import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./auth/Login";
import { Notification } from "./Notification/Notification";
import { Clients } from "./Clients/Clients";
import { Error404 } from "./components/Error404";
import { DeskMain } from "./UserDesk/DeskMain";
import { AdminMain } from "./UserAdmin/AdminMain";
import { WebSocketProvider } from "./context/WebSocketContext";
import Logout from "./auth/Logout";


function App() {
    return (
        <>
            <WebSocketProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/notification"
                            element={<Notification />}
                        />
                        <Route path="/client/*" element={<Clients />} />
                        <Route path="/user_admin/*" element={<AdminMain />} />
                        <Route path="/user_desk/*" element={<DeskMain />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/" element={<Navigate replace to="/login" />} />
                        {/* <Route path="*" element={<Error404/>} /> */}
                    </Routes>
                </BrowserRouter>
            </WebSocketProvider>
        </>
    );
}

export default App;
