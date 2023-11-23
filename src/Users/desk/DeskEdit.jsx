import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../axios';


export function DeskEdit() {

    const history = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
        name: '',
		state: null,
        busy: null,
        user: 1,
        category: 1
	});

	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {

		api.get('priority/get/' + id).then((response) => {
			setFormData({
				...formData,
				['name']: response.data.name,
				['state']: response.data.state,
				['busy']: response.data.busy,
				['user']: response.data.state,
				['category']: response.data.state,
			});
		});
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

		api.put(`priority/update/` + id + '/', {
			name: formData.name,
			description: formData.description
		});
		history({
			pathname: '/user/admin/priority/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div>
            <h1>Priorities update {id}</h1>
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
					type="text"
					name="description"
					placeholder="Description"
					onChange={handleChange}
					value={formData.description ?? ""}
				/>
				<br />
				<input type="button" value="Send" onClick={handleSubmit} />
				<input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}