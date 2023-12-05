import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/axios";

const Login = () => {

    const history = useNavigate();
	const initialFormData = {
		email: '',
		password: '',
	};

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		api
			.post(`token/`, {
				email: formData.email,
				password: formData.password,
			})
			//Get the two tokens and send them to localStorage
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				api.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				history('/home');
				//console.log(res);
				//console.log(res.data);
			});
	};

    return (
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
