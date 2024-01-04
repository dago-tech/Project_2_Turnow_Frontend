import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, patchData, postData } from "../../helpers/axios";
import { errorMessage } from "../../helpers/errorMessage";

export function UserCreateEdit({ edit }) {
    /* Shows a form to create o edit a User register */

    const endpoint = "user/create/";
    const history = useNavigate();
    const { id } = useParams();
    const initialFormData = {
        email: "",
        password: "",
        user_name: "",
        first_name: "",
        last_name: "",
        is_admin: false,
        is_active: true,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [error, setError] = useState("");

    useEffect(() => {
        if (edit) {
            getData("user/get/" + id)
                .then((response) => {
                    setFormData({
                        ...formData,
                        ["email"]: response.email,
                        ["user_name"]: response.user_name,
                        ["first_name"]: response.first_name,
                        ["last_name"]: response.last_name,
                        ["is_admin"]: response.is_admin,
                        ["is_active"]: response.is_active,
                    });
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

    const handleSubmit = () => {
        if (
            edit &&
            (formData.email == "" ||
                formData.user_name == "" ||
                formData.first_name == "" ||
                formData.last_name == "")
        ) {
            setError("¡You did not fill out all the fields!");
            return;
        } else if (
            !edit &&
            (formData.email == "" ||
                formData.user_name == "" ||
                formData.first_name == "" ||
                formData.last_name == "" ||
                formData.password == "")
        ) {
            setError("¡You did not fill out all the fields!");
            return;
        }
        // Clean ErrorForm if no validation issues
        setError("");

        if (edit) {
            patchData(`user/update/` + id + "/", {
                email: formData.email,
                user_name: formData.user_name,
                first_name: formData.first_name,
                last_name: formData.last_name,
                is_admin: formData.is_admin,
                is_active: formData.is_active,
            })
                .then(() => {
                    history({
                        pathname: "/user_admin/user/",
                    });
                })
                .catch((error) => {
                    setError(errorMessage(error));
                });
        } else {
            postData(endpoint, formData)
                .then(() => {
                    history({
                        pathname: "/user_admin/user/",
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
            <h1>Users update</h1>
            <form>
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                />
                <br />
                <label htmlFor="user_name">User name: </label>
                <input
                    type="text"
                    name="user_name"
                    placeholder="User name"
                    onChange={handleChange}
                    value={formData.user_name}
                />
                <br />
                {!edit && (
                    <>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <br />
                    </>
                )}
                <label htmlFor="first_name">First name: </label>
                <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    onChange={handleChange}
                    value={formData.first_name}
                />
                <br />
                <label htmlFor="last_name">Last name: </label>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    onChange={handleChange}
                    value={formData.last_name}
                />
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="is_admin"
                        checked={formData.is_admin}
                        onChange={handleChange}
                    />
                    Is admin
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                    />
                    Is active
                </label>
                <br />
                <input type="button" value="Send" onClick={handleSubmit} />
                <input type="reset" value="Clear" onClick={handleReset} />
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
