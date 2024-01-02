import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { getData, postData } from "../helpers/axios";
import { useAuth } from "../context/AuthContext";
import { setCookie } from "../helpers/cookies";

const Login = () => {
    const history = useNavigate();
    const initialFormData = {
        email: "",
        password: "",
    };

    const [formData, updateFormData] = useState(initialFormData);
    const [errorForm, setErrorForm] = useState("");
    const { setUserId, setIsAuthenticated, setIsAdmin, setUserEmail } =
        useAuth();

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email == "" || formData.password == "") {
            setErrorForm("¡You did not fill out all the fields!");
            return;
        }
        // Clean ErrorForm if no validation issues
        setErrorForm("");

        postData(`token/`, {
            email: formData.email,
            password: formData.password,
        })
            //Get the two tokens and send them to localStorage
            .then((response) => {
                localStorage.setItem("access_token", response.access);
                localStorage.setItem("refresh_token", response.refresh);
                //Sets the Authorization header for all subsequent HTTP requests made with the api instance
                api.defaults.headers["Authorization"] =
                    "JWT " + localStorage.getItem("access_token");
                history("/home");
                setIsAuthenticated(true);
                const token = response.access;
                const tokenParts = JSON.parse(atob(token.split(".")[1]));
                console.log(tokenParts);
                setUserId(tokenParts.user_id);

                return getData(`user/is_admin/${tokenParts.user_id}/`);
            })
            .then((response) => {
                console.log(response);
                setIsAdmin(response.is_admin);
                setUserEmail(response.email);
                setCookie("userEmail", response.email, 1);
            })
            .catch((error) => {
                if (error.response) {
                    setErrorForm(error.response.data.detail || "Login Error");
                } else {
                    setErrorForm(error.message || "System error");
                }
            });
    };

    return (
        <div>
            <h1>LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        autoComplete="email"
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        autoComplete="current-password"
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            {errorForm && <p style={{ color: "red" }}>{errorForm}</p>}
        </div>
    );
};

export default Login;
