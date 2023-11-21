import { useNavigate, useParams } from 'react-router-dom';
import api from '../../axios';
import { useState, useEffect } from 'react';

export function CategoriesEdit() {

    const history = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		name: '',
		description: ''
	});

	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {

		api.get('category/get/' + id).then((response) => {
			setFormData({
				...formData,
				['name']: response.data.name,
				['description']: response.data.description,
			});
			console.log(response.data);
		});
	}, [setFormData]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		api.put(`category/update/` + id + '/', {
			name: formData.name,
			description: formData.description
		});
		history({
			pathname: '/users/admin/categories/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
        // setDataToEdit(null);
    };

    return ( 
        <div>
            <h1>Categories update {id}</h1>
            {/* <h3>{dataToEdit ? "Editar" : "Agregar"}</h3> */}
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
                value={formData.description ?? ""}
                />
                <br />
                <input type="submit" value="Send" />
                <input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}