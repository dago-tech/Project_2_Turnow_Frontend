import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import Login from "./auth/Login";
import { Notification } from "./Notification/Notification";
import { Clients } from "./Clients/Clients";
import { DeskMain } from "./UserDesk/DeskMain";
import { AdminMain } from "./UserAdmin/AdminMain";
import { WebSocketProvider } from "./context/WebSocketContext";
import Logout from "./auth/Logout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";


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
                                {/* <Route path="*" element={<Error404/>} /> */}
                            </Routes>
                        </BrowserRouter>
                </AuthProvider>
            </WebSocketProvider>
        </>
    );
}

export default App;
