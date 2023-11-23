import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { useEffect, useState } from 'react';


export function DeskCreate() {

	const endpoint = "desk/create/"
    const history = useNavigate();
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
        // Load User and category fields options when component did mount
        getForeignKey('user/', setUserOptions);
        getForeignKey('category/', setCategoryOptions);
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
        console.log(formData)
	};

    const handleChangeFk = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseInt(value, 10),
        });
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

        if (formData.category.length === 0 || formData.user=='') {
            setErrorForm('¡You did not fill out all the fields!');
            return;
        }        
        // Clean ErrorForm if no validation issues
        setErrorForm('');

		const postData = async (endpoint, data) => {
			try {
				const response = await api.post(endpoint, data);
                console.log(response.data)
				return response.data;
			} catch (error) {
				console.error('Error in POST request:', error);
				throw error;
			}
		};
		postData(endpoint, formData)
		
		history({
			pathname: '/user/admin/desk/',
		});
		window.location.reload();
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div>
            <h1>Service desk Creation</h1>
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
                    <option value="">Select...</option>
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