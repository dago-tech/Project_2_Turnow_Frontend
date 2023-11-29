import { useState } from 'react';
import { putData } from '../axios';
import '../styles/main.css'


export function NextTurn() {
    
    const endpoint = 'turn/serve/1/'
    const [message, setMessage] = useState('Waiting');
    const [messageStyle, setMessageStyle] = useState('default');

    const handleNext = (e) => {
		e.preventDefault();
		
		putData(endpoint).then(() => {
            setMessage('One turn has been required');
            setMessageStyle('success')
        })
        .catch(() => {
            setMessage('There are no pending turns');
            setMessageStyle('error')
        })
		
	};

    return (
                
        <div>

            <button 
                className='principal_button'
                onClick={handleNext}
            >
                Call Next Turn
            </button>

        
            <div>
                <h4>Message: </h4>
                <br />
                <p className={messageStyle}>{message}</p>
            </div>
        </div>
    )
}