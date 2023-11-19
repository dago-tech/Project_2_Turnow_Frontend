import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Principal } from "./Principal";
import { Notification } from "./Notification/Notification";
import { Clients } from "./Clients/Clients";
import { UserMain } from "./Users/UserMain";
// import Login from "./Users/Login";
// import { UsersList } from "./Users/user/UsersList";
// import { AdminMain } from "./Users/AdminMain";
// import { DeskMain } from "./Users/DeskMain";


function App() {
  //const [count, setCount] = useState(0)

    return (
        <>

            <BrowserRouter>		
                <Routes>
                    <Route exact path="/" element={<Principal/>} />
                    <Route path="/notification" element={<Notification/>}/>
                    <Route path="/clients" element={<Clients/>}/>
                    <Route path="/users/*" element={<UserMain />}/>
                </Routes>
            </BrowserRouter>

            {/* <BrowserRouter>		
            <Routes>
                <Route exact path="/" element={<Principal/>} />
                <Route path="/notification" element={<Notification/>}/>
                <Route path="/clients" element={<Clients/>}/>
                <Route path="/users/login" element={<Login/>}/>

                <Route path="/users" element={<UserMain />}>
                    <Route index element={<UsersList />} />
                    <Route path="login" element={<Login />} />
                    <Route path="admin" element={<AdminMain />}>
                        <Route index element={<UsersList />} />
                    </Route>
                    <Route path="desk" element={<DeskMain />} />
                </Route>
            </Routes>
            </BrowserRouter> */}
        </>
    )
}

export default App
