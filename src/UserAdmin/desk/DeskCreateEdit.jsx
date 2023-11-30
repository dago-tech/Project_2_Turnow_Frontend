import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData, postData, putData } from '../../axios';
import api from '../../axios';


export function DeskCreateEdit({ edit }) {

    const endpoint = "desk/create/"
    const history = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({
        name: '',
		state: true,
        busy: false,
        user: '',
        category: []
	});

	const [formData, setFormData] = useState(initialFormData);
	const [userOptions, setUserOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [errorForm, setErrorForm] = useState('');

	useEffect(() => {
		getForeignKey('user/', setUserOptions);
        getForeignKey('category/', setCategoryOptions);


        if (edit) {
			getData('desk/get/' + id).then(response => {
				console.log(response);
				setFormData({
					...formData,
					['name']: response.name,
                    ['state']: response.state,
                    ['busy']: response.busy,
                    ['user']: response.user,
                    ['category']: response.category,
				});
			})
			.catch(error => {
				console.error('Error:', error);
			});		
		}
	}, []);

	const getForeignKey = async (endpoint, func) => {
        try {
            const response = await api.get(endpoint);
            func(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error getting user and category options:', error);
        }
    };

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
		});
	};

	const handleChangeFk = (e) => {
        const { name, value } = e.target;
        if (value=='') {
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            setFormData({
                ...formData,
                [name]: parseInt(value, 10),
            });
        }
    };

	const handleMultipleChange = (e) => {
        const { name, options } = e.target;
        const selectedValues = Array.from(options)
            .filter((option) => option.selected)
            .map((option) => option.value);

        setFormData({
            ...formData,
            [name]: selectedValues,
        });
    };

	const handleSubmit = (e) => {
		e.preventDefault();
        console.log(formData)

        if (formData.name=='' || !formData.user || formData.category.length==0) {
            setErrorForm('¡You did not fill out all the fields!');
            return;
        }        
        // Clean ErrorForm if no validation issues
        setErrorForm('');
		
		
		if (edit) {
			putData(`desk/update/` + id + '/', {
				name: formData.name,
                state: formData.state,
                busy: formData.busy,
                user: formData.user,
                category: formData.category,
			})	
		} else {
			postData(endpoint, formData)
		}

		history({
			pathname: '/user_admin/desk/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div className="center">
            <h1>Service Desk</h1>
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
                <label htmlFor="user">User:</label>
                <select
                    id="user"
                    name="user"
                    value={formData.user}
                    onChange={handleChangeFk}
                >
                    <option value=''>Select...</option>
                    {userOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.user_name}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    multiple
                    value={formData.category}
                    onChange={handleMultipleChange}
                >
                {categoryOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
                </select>
                <br />
                <label>
                <input
                    type="checkbox"
                    name="state"
                    checked={formData.state}
                    onChange={handleChange}
                />
                State
                </label>
                <br />
                <label>
                <input
                    type="checkbox"
                    name="busy"
                    checked={formData.busy}
                    onChange={handleChange}
                />
                Busy
                </label>
                <br />
                {errorForm && <p style={{ color: 'red' }}>{errorForm}</p>}
				<input type="button" value="Send" onClick={handleSubmit} />
				<input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}