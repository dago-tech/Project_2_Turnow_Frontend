import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientContext from '../context/ClientContext';
import { postData } from '../axios';
import '../styles/main.css'

export function ClientTurn() {

    const { idClient, idCategory, idPriority } = useContext(ClientContext);

    const [turnNumber, setTurnNumber] = useState('')

    const endpoint = 'turn/create/'
    const history = useNavigate();
    
    useEffect(() => {

        console.log(idClient, idCategory, idPriority)

        const data = {
            personal_id: idClient,
            category: idCategory,
            priority: idPriority
        }

        postData(endpoint, data).then(response => {
            console.log(response)
            setTurnNumber(response.turn_number)
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }, []);

    const handleSubmit = () => {

        history({
			pathname: '/client/',
		});
    };

    return (
        <>
            <div className='center'>
                <h1>Your turn number is:</h1>

                <div className='turn'>
                    <p style={{margin: 'auto'}}>{turnNumber}</p>
                </div>

            </div>
            
            <div style={{ textAlign: 'right' }}>
                <button
                    className={'next_button'}
                    onClick={handleSubmit}
                >
                    Finish
                </button>
            </div>
        </>
    )
}