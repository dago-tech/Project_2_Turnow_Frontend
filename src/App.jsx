import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { Principal } from "./Principal";
import { Notification } from "./Notification/Notification";
import { Clients } from "./Clients/Clients";
import { UserMain } from "./Users/UserMain";


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

        </>
    )
}

export default App
