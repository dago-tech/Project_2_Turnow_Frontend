import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../axios';


export function UserEdit() {

    const history = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		email: '',
        user_name: '',
        first_name: '',
        last_name: '',
        is_admin: false,
        is_active: true
	});

	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {

		api.get('user/get/' + id).then((response) => {
			setFormData({
				...formData,
				['email']: response.data.email,
				['user_name']: response.data.user_name,
				['first_name']: response.data.first_name,
				['last_name']: response.data.last_name,
				['is_admin']: response.data.is_admin,
				['is_active']: response.data.is_active
			});
		});
	}, []);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		api.patch(`user/update/` + id + '/', {
			email: formData.email,
			user_name: formData.user_name,
			first_name: formData.first_name,
			last_name: formData.last_name,
			is_admin: formData.is_admin,
			is_active: formData.is_active
		});
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
            <h1>Users update {id}</h1>
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
					value={formData.user_name ?? ""}
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