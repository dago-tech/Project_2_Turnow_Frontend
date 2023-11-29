import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postData } from '../axios';

export function VerifyTurn() {
    
    const endpoint = 'turn/serve/1'
    const [errorForm, setErrorForm] = useState('');

    const handleNext = (e) => {
		e.preventDefault();

        if (false) {
            setErrorForm('¡You did not fill out all the fields!');
            return;
        }        
        // Clean ErrorForm if no validation issues
        setErrorForm('');
		
		postData(endpoint).then(response => {
            setData(response);
            setError(null);
        })
        .catch(error => {
            console.error('Error:', error);
        })
		

		history({
			pathname: '/user_admin/desk/',
		});
		window.location.reload();
	};

    return (
                
        <div>
            <Link to="/verify">
                <button 
                    className='principal_button'
                    onClick={handleNext}
                >
                    Call Next Turn
                </button>
            </Link>
        
            <div>
                <h4>Message: </h4>
                <br />
                {errorForm && <p style={{ color: 'red' }}>{errorForm}</p>}
            </div>
        </div>
    )
}