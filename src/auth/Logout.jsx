import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { postData } from "../helpers/axios";
import { deleteCookie } from "../helpers/cookies";

export default function Logout() {
    const history = useNavigate();

    useEffect(() => {
        deleteCookie("userEmail");
        postData("/user/logout/blacklist/", {
            refresh_token: localStorage.getItem("refresh_token"),
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        api.defaults.headers["Authorization"] = null;
        history("/login");
    });

    return <div>Logout</div>;
}
