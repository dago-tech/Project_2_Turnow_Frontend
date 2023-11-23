import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Principal } from "./Principal";
import { Notification } from "./Notification/Notification";
import { Clients } from "./Clients/Clients";
import { UserMain } from "./Users/UserMain";
import { Error404 } from "./components/Error404";


function App() {
  //const [count, setCount] = useState(0)

    return (
        <>
            <BrowserRouter>		
                <Routes>
                    <Route exact path="/" element={<Principal/>} />
                    <Route path="/notification" element={<Notification/>}/>
                    <Route path="/client" element={<Clients/>}/>
                    <Route path="/user/*" element={<UserMain />}/>
                    <Route path="*" element={<Error404/>} />
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
