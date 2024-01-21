import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../helpers/axios";
import { errorMessage } from "../helpers/errorMessage";
import { useAuth } from "../context/AuthContext";
import Cookies from 'js-cookie';
import "../styles/main.css";

export default function Logout() {
    /*Logout the user and delete tokens */
    const history = useNavigate();
    const [error, setError] = useState("");
    const { setUserId, setIsAuthenticated, setIsAdmin, setUserEmail } =
        useAuth();

    useEffect(() => {
        Cookies.remove('userEmail');
        // Send token to backend backlist so it is not used again
        postData("/user/logout/blacklist/", {
            refresh_token: localStorage.getItem("refresh_token"),
        }).then(() => {
            Cookies.remove('access_token');
            Cookies.remove('refresh_token');
            setIsAuthenticated(false);
            setIsAdmin(false);
            setUserId("");
            setUserEmail("");
            history("/home");
        })
        .catch((error) => {
            setError(errorMessage(error));
        });
        
    });

    return (
        <>
            {error && 
                <div className="center">
                    <p className="error">{error}</p>
                    <Link to="/home">Home</Link>
                </div>
            }
        </>
    );
}
