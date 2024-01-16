import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, postData, putData } from "../../helpers/axios";
import { errorMessage } from "../../helpers/errorMessage";
import { SendClearButtons } from "../../components/SendClearButtons";

export function ClientCreateEdit({ edit }) {
    /* Shows a form to create o edit a Client register */

    const endpoint = "client/create/";
    const history = useNavigate();
    const { id } = useParams();

    const initialFormData = {
        id_type: "",
        personal_id: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState("");

    useEffect(() => {
        if (edit) {
            getData("client/get/" + id)
                .then((response) => {
                    setFormData({
                        ...formData,
                        ["id_type"]: response.id_type,
                        ["personal_id"]: response.personal_id,
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
        if (formData.personal_id == "" || formData.id_type == "") {
            setError("¡You did not fill out all the fields!");
            return;
        }
        // Clean ErrorForm if no validation issues
        setError("");

        if (edit) {
            putData(`client/update/` + id + "/", {
                id_type: formData.id_type,
                personal_id: formData.personal_id,
            })
                .then(() => {
                    history({
                        pathname: "/user_admin/client/",
                    });
                })
                .catch((error) => {
                    setError(errorMessage(error));
                });
        } else {
            postData(endpoint, formData)
                .then(() => {
                    history({
                        pathname: "/user_admin/client/",
                    });
                })
                .catch((error) => {
                    setError(errorMessage(error));
                });
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
    };

    return (
        <div className="center">
            <h1 className="create-edit-title">Client</h1>
            <form>
                <label htmlFor="id_type">ID type:</label>
                <select
                    id="id_type"
                    name="id_type"
                    value={formData.id_type}
                    onChange={handleChange}
                >
                    <option value="">Select...</option>
                    <option value="cedula">CC</option>
                    <option value="tarjeta_identidad">TI</option>
                    <option value="pasaporte">PA</option>
                    <option value="cedula_extrangería">CE</option>
                </select>
                <br />
                <label htmlFor="personal_id">Personal ID: </label>
                <input
                    type="text"
                    name="personal_id"
                    placeholder="Personal ID"
                    onChange={handleChange}
                    value={formData.personal_id}
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
