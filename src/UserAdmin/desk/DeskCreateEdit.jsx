import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, postData, putData } from "../../helpers/axios";
import api from "../../helpers/axios";
import { errorMessage } from "../../helpers/errorMessage";
import { SendClearButtons } from "../../components/SendClearButtons";

export function DeskCreateEdit({ edit }) {
    /* Shows a form to create o edit a Desk (Service point) register */

    const endpoint = "desk/create/";
    const history = useNavigate();
    const { id } = useParams();
    
    const initialFormData = {
        name: "",
        state: true,
        busy: false,
        user: "",
        category: [],
    };

    const [formData, setFormData] = useState(initialFormData);
    const [userOptions, setUserOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {

        getData("user/")
            .then((response) => {
                setUserOptions(response)
                return getData("category/")
            })
            .then((response) => {
                setCategoryOptions(response)
            }).catch((error) => {
                setError(errorMessage(error));
            });

        if (edit) {
            getData("desk/get/" + id)
                .then((response) => {
                    setFormData({
                        ...formData,
                        ["name"]: response.name,
                        ["state"]: response.state,
                        ["busy"]: response.busy,
                        ["user"]: response.user,
                        ["category"]: response.category,
                    });
                    setError(null);
                })
                .catch((error) => {
                    setError(errorMessage(error));
                });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.type === "checkbox"
                    ? e.target.checked
                    : e.target.value,
        });
    };

    const handleChangeFk = (e) => {
        const { name, value } = e.target;
        if (value == "") {
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

    const handleSubmit = () => {

        if (
            formData.name == "" ||
            !formData.user ||
            formData.category.length == 0
        ) {
            setError("¡You did not fill out all the fields!");
            return;
        }
        // Clean ErrorForm if no validation issues
        setError("");

        if (edit) {
            putData(`desk/update/` + id + "/", {
                name: formData.name,
                state: formData.state,
                busy: formData.busy,
                user: formData.user,
                category: formData.category,
            }).then(() => {
                history({
                    pathname: "/user_admin/desk/",
                });
            }).catch((error) => {
                setError(errorMessage(error));
            });            
        } else {
            postData(endpoint, formData)
                .then(() => {
                    history({
                        pathname: "/user_admin/desk/",
                    });
                }).catch((error) => {
                    setError(errorMessage(error));
                });
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <div className="center">
            <h1 className="create-edit-title">Service Desk</h1>
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
                <SendClearButtons
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                />
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
