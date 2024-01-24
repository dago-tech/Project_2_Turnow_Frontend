import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WebSocketProvider } from "./components/context/WebSocketContext";
import { AuthProvider } from "./components/context/AuthContext";
import { Home } from "./components/Home";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import { Notification } from "./components/Notification/Notification";
import { Clients } from "./components/Clients/Clients";
import { DeskMain } from "./components/userDesk/DeskMain";
import { AdminMain } from "./components/userAdmin/AdminMain";


function App() {
    /* Main Application component, it renders all child components based on its route */
    return (
        <>
            <WebSocketProvider>
                <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/home" element={<Home />} />
                                <Route
                                    path="/notification"
                                    element={<Notification />}
                                />
                                <Route path="/client/*" element={<Clients />} />
                                <Route
                                    path="/user_admin/*"
                                    element={<PrivateRoute element={AdminMain} adminRequired />}
                                />
                                <Route
                                    path="/user_desk/*"
                                    element={<PrivateRoute element={DeskMain} />}
                                />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/" element={<Navigate to="/home" />} />
                                <Route path="*" element={<Navigate to="/home" />} />
                            </Routes>
                        </BrowserRouter>
                </AuthProvider>
            </WebSocketProvider>
        </>
    );
}

export default App;
