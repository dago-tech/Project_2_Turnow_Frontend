import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { VerifyTurn } from "./VerifyTurn";
import { NextTurn } from "./NextTurn";
import { ServedTurn } from "./ServedTurn";

export function DeskManage() {
    
    return (
        <div className="center">
            <h1>Desk Management</h1>

            <div className='turn_manage'>
                <NextTurn/>

                <VerifyTurn/>

                <ServedTurn/>
            </div>
        </div>
    )
}