import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../helpers/axios";
import { useAuth } from "../context/AuthContext";
import Cookies from 'js-cookie';
import { errorMessage } from "../helpers/errorMessage";
import "../styles/main.css";

const Login = () => {
    /*Login form, it gets tokens from backend */

    const history = useNavigate();
    const initialFormData = {
        email: "",
        password: "",
    };

    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState("");
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
            setError("¡You did not fill out all the fields!");
            return;
        }
        // Clean errorForm if no validation issues
        setError("");

        postData("token/", {
            email: formData.email,
            password: formData.password,
        })
            //Get the two tokens and send them to localStorage
            .then((response) => {
                localStorage.setItem("access_token", response.access);
                localStorage.setItem("refresh_token", response.refresh);

                const token = response.access;
                const tokenParts = JSON.parse(atob(token.split(".")[1]));
                setUserId(tokenParts.user_id);
                setIsAuthenticated(true);
                history("/home");

                return getData(`user/is_admin/${tokenParts.user_id}/`);
            })
            .then((response) => {
                setIsAdmin(response.is_admin);
                setUserEmail(response.email);
                Cookies.set('userEmail', response.email, { expires: 1, secure: false });
            })
            .catch((error) => {
                setError(errorMessage(error));
            });
    };

    return (
        <div className="login-container">
            <h1>TURNOW</h1>
            <h3>LOGIN</h3>
            <form className="login-form" onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Login;
