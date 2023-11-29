import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData, postData, putData } from '../../axios';


export function ClientCreateEdit({ edit }) {

	const endpoint = "client/create/"
    const history = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		id_type: '',
		personal_id: ''
	});

	const [formData, setFormData] = useState(initialFormData);
	const [errorForm, setErrorForm] = useState('');

	useEffect(() => {

		if (edit) {
			getData('client/get/' + id).then(response => {
				console.log(response);
				setFormData({
					...formData,
					['id_type']: response.id_type,
					['personal_id']: response.personal_id
				});
			})
			.catch(error => {
				console.error('Error:', error);
			});		
		}
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {

		e.preventDefault();
		console.log(formData);

		if (formData.personal_id=='') {
            setErrorForm('¡You did not fill out all the fields!');
            return;
        }        
        // Clean ErrorForm if no validation issues
        setErrorForm('');
		
		
		if (edit) {
			putData(`client/update/` + id + '/', {
				id_type: formData.id_type,
				personal_id: formData.personal_id
			})	
		} else {
			postData(endpoint, formData)
		}

		history({
			pathname: '/user_admin/client/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div>
            <h1>Client</h1>
            <form>
			<label htmlFor="id_type">ID type:</label>
                <select
                    id="id_type"
                    name="id_type"
                    value={formData.id_type}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>                    
                    <option value="cedula">CC</option>
                    <option value="tarjeta_identidad">TI</option>
                    <option value="pasaporte">PA</option>
                    <option value="cedula_extrangería">CE</option>
                </select>
                <br />
                <label htmlFor="personal_id">Personal ID: </label>
                <input
                    type="text"
					name="personal_id"
                    placeholder="Personal ID"
                    onChange={handleChange}
                    value={formData.personal_id}
                />
                <br />
				{errorForm && <p style={{ color: 'red' }}>{errorForm}</p>}
                <input type="button" value="Send" onClick={handleSubmit} />
                <input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}