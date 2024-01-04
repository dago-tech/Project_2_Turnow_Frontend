import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../helpers/axios";
import { deleteCookie } from "../helpers/cookies";
import { errorMessage } from "../helpers/errorMessage";
import "../styles/main.css";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
    /*Logout the user and delete tokens */
    const history = useNavigate();
    const [error, setError] = useState("");
    const { setUserId, setIsAuthenticated, setIsAdmin, setUserEmail } =
        useAuth();

    useEffect(() => {
        deleteCookie("userEmail");
        // Send token to backend backlist so it is not used again
        postData("/user/logout/blacklist/", {
            refresh_token: localStorage.getItem("refresh_token"),
        }).then(() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
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
