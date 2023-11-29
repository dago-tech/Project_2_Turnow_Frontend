import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Principal } from "./Principal";
import { Notification } from "./Notification/Notification";
import { Clients } from "./Clients/Clients";
import { Error404 } from "./components/Error404";
import { DeskMain } from "./UserDesk/DeskMain";
import { AdminMain } from "./UserAdmin/AdminMain";


function App() {

    return (
        <>
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
        </>
    )
}

export default App
