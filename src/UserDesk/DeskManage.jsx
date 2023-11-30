import { useState } from 'react';
import { TurnProvider } from '../context/ManageTurnContext';
import { VerifyTurn } from "./VerifyTurn";
import { NextTurn } from "./NextTurn";
import { ServedTurn } from "./ServedTurn";


export function DeskManage() {

    const initialMessage = {
        message: 'Waiting',
        style: 'default'
    }
    const [nextMessage, setNextMessage] = useState(initialMessage);
    const [verifyMessage, setVerifyMessage] = useState(initialMessage);
    const [servedMessage, setServedMessage] = useState(initialMessage);

    const data = {
        nextMessage,
        setNextMessage,
        verifyMessage,
        setVerifyMessage,
        servedMessage,
        setServedMessage        
    };
    
    return (
        <TurnProvider value={data}>
            <div className="center">
                <h1>Turn Management</h1>

                <div className='turn_manage'>
                    <NextTurn/>

                    <VerifyTurn/>

                    <ServedTurn/>
                </div>
            </div>
        </TurnProvider>
    )
}