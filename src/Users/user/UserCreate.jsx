import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useState } from 'react';

export function UserCreate() {

	const endpoint = "user/create/"
    const history = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
        user_name: '',
        password: '',
        first_name: '',
        last_name: '',
        is_admin: false,
        is_active: true
	});

	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
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
			pathname: '/user/admin/user/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div>
            <h1>User Create</h1>
            <form>
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <br />
                <label htmlFor="user_name">User name: </label>
                <input
                    type="text"
                    name="user_name"
                    placeholder="User name"
                    onChange={handleChange}
                    value={formData.user_name}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />
                <label htmlFor="first_name">First name: </label>
                <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    onChange={handleChange}
                    value={formData.first_name}
                />
                <br />
                <label htmlFor="last_name">Last name: </label>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    onChange={handleChange}
                    value={formData.last_name}
                />
                <br />
                <label>
                <input
                    type="checkbox"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={handleChange}
                />
                Is admin
                </label>
                <br />
                <label>
                <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                />
                Is active
                </label>
                <br />
                <input type="button" value="Send" onClick={handleSubmit} />
                <input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}