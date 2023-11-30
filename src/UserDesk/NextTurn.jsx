import { useState } from 'react';
import { putData } from '../axios';
import { useContext } from 'react';
import TurnContext from '../context/ManageTurnContext';
import '../styles/main.css'


export function NextTurn() {
    
    const endpoint = 'turn/serve/1/'
    const { nextMessage, setNextMessage, 
        setVerifyMessage, setServedMessage } = useContext(TurnContext);

    const defaultMessage = {
        message: 'Waiting',
        style: 'default'
    }
    const successMessage = {
        message: 'One turn has been required',
        style: 'success'
    }
    const errorMessage = {
        message: 'There are no pending turns',
        style: 'error'
    }

    const handleSubmit = (e) => {
		e.preventDefault();
		
		putData(endpoint).then(() => {
            setNextMessage(successMessage);
            setVerifyMessage(defaultMessage);
            setServedMessage(defaultMessage);
        })
        .catch(() => {
            setNextMessage(errorMessage);
        })
	};

    return (                
        <div>
            <button 
                className='principal_button'
                onClick={handleSubmit}
            >
                Call Next Turn
            </button>        
            <div>
                <h4>Message: </h4>
                <br />
                <p className={nextMessage.style}>{nextMessage.message}</p>
            </div>
        </div>
    )
}