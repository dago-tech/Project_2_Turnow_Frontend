import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../axios';


export function ClientCategory () {

    const history = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        // Realizar la solicitud a la API para obtener las categorías

        getData('category/').then(response => {
            setCategories(response,);
        })
        .catch(error => {
            console.error('Error:', error);
        });	

    }, []);

    const handlePreviousPage = () => {
        history({
			pathname: '/client/priority',
		});
		window.location.reload();
    }

    const handleSelection = (category_id) => {
        setSelected(category_id);
    };

    const handleSubmit = () => {
        history({
			pathname: '/client/turn/',
		}); 
    };

    return (
        <div className='center'>
            <h2>Select your category:</h2>
            <div style={{textAlign: 'left'}}>
                <button 
                    onClick={handlePreviousPage}
                >
                    Back
                </button>
            </div>
            
            <ul style={{textAlign: 'center'}}>
                {categories.map((category) => (
                <li key={category.id}>
                    <button
                        onClick={() => handleSelection(category.id)}
                        className={`${selected === category.id ? 'selected' : ''} id_button`}
                    >
                        {category.name}
                    </button>
                </li>
                ))}
            </ul>
            <div style={{textAlign: 'right'}}>
                <button onClick={handleSubmit} disabled={!selected}>
                    Next
                </button>
            </div>
            
        </div>
    );
};