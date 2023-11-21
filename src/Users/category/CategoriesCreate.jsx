import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useState } from 'react';

export function CategoriesCreate() {

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
			// Trimming any whitespace
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
			pathname: '/users/admin/categories/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div>
            <h1>Categories Create</h1>
            <form onSubmit={handleSubmit}>
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
                type="text"
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={formData.description}
                />
                <br />
                <input type="submit" value="Send" />
                <input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}