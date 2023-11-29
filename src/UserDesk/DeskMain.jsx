import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { TurnList } from "../UserAdmin/turn/TurnList";
import { DeskManage } from "./DeskManage";


export function DeskMain() {
  
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, textAlign: 'center'}}>
                <h2>Desk menu</h2>
                <nav>
                    <ul>
                        <li><Link to="/user_desk">Turn Management</Link></li>
                        <li><Link to="/user_desk/turn">Turns</Link></li>
                        <li><Link to="/user_desk/priority">Reiniciar conteo</Link></li>
                        
                    </ul>
                </nav>
            </div>

            <div style={{ flex: 5, marginRight: '15vw'}}>
                <Routes>
                    <Route path="*" element={<DeskManage />} />                   
                    <Route path="/turn" element={<TurnList />} />
                </Routes>
            </div>                
        </div>
        
    )
}