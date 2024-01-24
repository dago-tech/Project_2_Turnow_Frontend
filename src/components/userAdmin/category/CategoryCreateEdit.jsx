import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, postData, putData } from "../../../helpers/axios";
import { errorMessage } from "../../../helpers/errorMessage";
import { SendClearButtons } from "../../SendClearButtons";


export function CategoryCreateEdit({ edit }) {
    /* Shows a form to create o edit a Category register */

    const endpoint = "category/create/";
    const history = useNavigate();
    const { id } = useParams();
    const initialFormData = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState("");

    useEffect(() => {
        if (edit) {
            getData("category/get/" + id)
                .then((response) => {
                    setFormData({
                        ...formData,
                        ["name"]: response.name,
                        ["description"]: response.description,
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
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {

        if (formData.name == "") {
            setError("¡You did not fill out all the fields!");
            return;
        }
        // Clean ErrorForm if no validation issues
        setError("");

        if (edit) {
            putData(`category/update/` + id + "/", {
                name: formData.name,
                description: formData.description,
            }).then(() => {
                history({
                    pathname: "/user_admin/category/",
                });
            }).catch((error) => {
                setError(errorMessage(error));
            });
        } else {
            postData(endpoint, formData)
                .then(() => {
                    history({
                        pathname: "/user_admin/category/",
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
            <h1 className="create-edit-title">Category</h1>
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

                <SendClearButtons
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                />

            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
