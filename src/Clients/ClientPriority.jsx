import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../axios';


export function ClientPriority () {

    const history = useNavigate();
    const [priorities, setPriorities] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        // Realizar la solicitud a la API para obtener las categorías

        getData('priority/').then(response => {
            console.log(response);
            setPriorities(response,);
        })
        .catch(error => {
            console.error('Error:', error);
        });	

    }, []);

    const handlePreviousPage = () => {
        history({
			pathname: '/client/',
		});
		window.location.reload();
    }

    const handleSelection = (priority_id) => {
        setSelected(priority_id);
    };

    const handleSubmit = () => {
        history({
			pathname: '/client/category/',
		}); 
    };

    return (
        <div>
            <h2>Priority:</h2>
            <button onClick={handlePreviousPage}>Back</button>
            <ul>
                {priorities.map((priority) => (
                <li key={priority.id}>
                    <button
                        onClick={() => handleSelection(priority.id)}
                        className={`${selected === priority.id ? 'selected' : ''} id_button`}
                    >
                        {priority.name}
                    </button>
                </li>
                ))}
            </ul>
            <button 
                onClick={handleSubmit} disabled={!selected}
            >
                Next
            </button>
        </div>
    );
};