import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useState } from 'react';

export function CategoryCreate() {

	const endpoint = "category/create/"
    const history = useNavigate();
	const initialFormData = Object.freeze({
		name: '',
		description: ''
	});

	const [formData, setFormData] = useState(initialFormData);


	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const postData = async (endpoint, data) => {
			try {
				const response = await api.post(endpoint, data);
				return response.data;
			} catch (error) {
				console.error('Error in POST request:', error);
				throw error;
			}
		};
		postData(endpoint, formData)
		
		history({
			pathname: '/user/admin/category/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div>
            <h1>Categories Create</h1>
            <form>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <br />
                <label htmlFor="description">Description: </label>
                <input
                    type={formData.description}
                />
                <br />
                <input type="button" value="Send" onClick={handleSubmit} />
                <input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}