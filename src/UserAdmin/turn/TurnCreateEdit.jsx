import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData, postData, patchData } from '../../axios';


export function TurnCreateEdit({ edit }) {

    const endpoint = "turn/create/"
    const history = useNavigate();
	const { id } = useParams();
	const initialFormData = Object.freeze({

		state: 'pending',
        personal_id: '',
        category: '',
        priority: '',
        desk: ''
	});

	const [formData, setFormData] = useState(initialFormData);
	const [clientOptions, setClientOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState([]);
    const [deskOptions, setDeskOptions] = useState([]);
    const [errorForm, setErrorForm] = useState('');

	useEffect(() => {
		getForeignKey('client/', setClientOptions);
        getForeignKey('category/', setCategoryOptions);
        getForeignKey('priority/', setPriorityOptions);
        getForeignKey('desk/', setDeskOptions);


        if (edit) {
			getData('turn/get/' + id).then(response => {
				setFormData({
					...formData,
                    ['state']: response.state,
                    ['personal_id']: response.personal_id,
                    ['category']: response.category,
                    ['priority']: response.priority,
                    ['desk']: response.desk,
				});
			})
			.catch(error => {
				console.error('Error:', error);
			});		
		}
	}, []);

	const getForeignKey = async (endpoint, func) => {
        getData(endpoint).then(response => {
            func(response);
        })
        .catch(error => {
            console.error('Error getting options:', error);
        });
    };

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
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


	const handleSubmit = (e) => {
		e.preventDefault();
        console.log(formData)

        if (formData.personal_id=='' || formData.category=='' 
            || formData.priority=='') {
            setErrorForm('¡You did not fill out all the fields!');
            return;
        }        
        // Clean ErrorForm if no validation issues
        setErrorForm('');
		
		
		if (edit) {
			patchData(`turn/update/` + id + '/', {
                state: formData.state,
                personal_id: formData.personal_id,
                category: formData.category,
                priority: formData.priority,
                desk: formData.desk
			})	
		} else {
			postData(endpoint, formData)
		}

		history(-1);
        setTimeout(() => {
            window.location.reload();
        }, 50);
	};

    const handleReset = (e) => {
        setFormData(initialFormData);
    };

    return ( 
        <div className="center">
            <h1>Turn</h1>
            <form>
			    <label htmlFor="state">State: </label>
                <select
                    id="state"
                    name="state"
                    onChange={handleChange}
                    value={formData.state}
                >
                    <option value="pending">Pending</option>
                    <option value="serving">Serving</option>
                    <option value="served">Served</option>
                    <option value="first to serve">First to serve</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <br />                
                <label htmlFor="personal_id">User:</label>
                <select
                    id="personal_id"
                    name="personal_id"
                    value={formData.personal_id}
                    onChange={handleChangeFk}
                >
                    <option value=''>Select...</option>
                    {clientOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.personal_id}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChangeFk}
                >
                    <option value=''>Select...</option>
                    {categoryOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <br />
                <label htmlFor="priority">Priority:</label>
                <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChangeFk}
                >
                    <option value=''>Select...</option>
                    {priorityOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />
                <label htmlFor="desk">Desk:</label>
                <select
                    id="desk"
                    name="desk"
                    value={formData.desk}
                    onChange={handleChangeFk}
                >
                    <option value=''>Select...</option>
                    {deskOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <br />
                {errorForm && <p style={{ color: 'red' }}>{errorForm}</p>}
				<input type="button" value="Send" onClick={handleSubmit} />
				<input type="reset" value="Clear" onClick={handleReset} />
            </form>
        </div>
    )
}