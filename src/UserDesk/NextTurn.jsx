import { useEffect, useState } from 'react';
import { putData } from '../axios';
import { useContext } from 'react';
import TurnContext from '../context/ManageTurnContext';
import '../styles/main.css'
import ClientContext from '../context/ClientContext';
import turnSocketInstance from '../WebSocket/WebSocket';


export function NextTurn() {
    
    const endpoint = 'turn/serve/1/'
    const { nextMessage, setNextMessage, 
        setVerifyMessage, setServedMessage } = useContext(TurnContext);

    const { setNotificationChange } = useContext(ClientContext);

    const [mensaje, setMensaje] = useState('');

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

    useEffect(() => {
        // Escuchar eventos del WebSocket
        turnSocketInstance.connect();

        // Desconectar el WebSocket al desmontar el componente
        return () => {
            turnSocketInstance.disconnect();
        };
    }, []);

    const enviarMensaje = () => {
        // Enviar mensaje al servidor a través del WebSocket
        let mes = turnSocketInstance.sendMessage({'message': 'Hola desde el cliente React' });
        console.log(turnSocketInstance.connect.data)
    };

    const handleSubmit = (e) => {
		e.preventDefault();
		
		putData(endpoint).then(() => {
            setNextMessage(successMessage);
            setVerifyMessage(defaultMessage);
            setServedMessage(defaultMessage);
            setNotificationChange('a')
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
                <button onClick={enviarMensaje}>Enviar Mensaje</button>
                <br />
                <p className={nextMessage.style}>{nextMessage.message}</p>
            </div>
        </div>
    )
}