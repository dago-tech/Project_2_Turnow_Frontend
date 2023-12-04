import { useContext } from 'react';
import TurnContext from '../context/ManageTurnContext';
import { putData } from '../axios';


export function ServedTurn() {
    
    const endpoint = 'turn/served/1/'
    const { servedMessage, setServedMessage, 
        setNextMessage, setVerifyMessage } = useContext(TurnContext);

    const defaultMessage = {
        message: 'Waiting',
        style: 'default'
    }
    const successMessage = {
        message: 'Current turn has been marked as "served"',
        style: 'success'
    }
    const errorMessage = {
        message: 'There is an error',
        style: 'error'
    }


    const handleSubmit = (e) => {
		e.preventDefault();
		
		putData(endpoint).then(() => {
            setServedMessage(successMessage);
            setNextMessage(defaultMessage)
            setVerifyMessage(defaultMessage)
        })
        .catch(() => {
            setServedMessage(errorMessage);
        })
	};

    return (                
        <div>
            <button 
                className='principal_button'
                onClick={handleSubmit}
            >
                Attention finished
            </button>
        
            <div>
                <h4>Message: </h4>
                <br />
                <p className={servedMessage.style}>{servedMessage.message}</p>
            </div>
        </div>
    )
}