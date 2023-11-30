import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData, postData, putData } from '../../axios';


export function CategoryCreateEdit({ edit }) {

	const endpoint = "category/create/"
    const history = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
		name: '',
		description: ''
	});

	const [formData, setFormData] = useState(initialFormData);
	const [errorForm, setErrorForm] = useState('');

	useEffect(() => {

		if (edit) {
			getData('category/get/' + id).then(response => {
				console.log(response);
				setFormData({
					...formData,
					['name']: response.name,
					['description']: response.description,
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

		if (formData.name=='') {
            setErrorForm('¡You did not fill out all the fields!');
            return;
        }        
        // Clean ErrorForm if no validation issues
        setErrorForm('');
		
		if (edit) {
			putData(`category/update/` + id + '/', {
				name: formData.name,
				description: formData.description
			})	
		} else {
			postData(endpoint, formData)
		}

		history({
			pathname: '/user_admin/category/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div className="center">
            <h1>Category</h1>
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
				{errorForm && <p style={{ color: 'red' }}>{errorForm}</p>}
                <input type="button" value="Send" onClick={handleSubmit} />
                <input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}