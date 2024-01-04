import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { postData } from "../helpers/axios";
import { deleteCookie } from "../helpers/cookies";

export default function Logout() {
    /*Logout the user and delete tokens */
    const history = useNavigate();

    useEffect(() => {
        deleteCookie("userEmail");
        // Send token to backend backlist so it is not used again
        postData("/user/logout/blacklist/", {
            refresh_token: localStorage.getItem("refresh_token"),
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        history("/login");
    });

    return <div>Logout</div>;
}
