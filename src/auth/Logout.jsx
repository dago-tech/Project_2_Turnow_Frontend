import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/axios";

export default function Logout() {
    const history = useNavigate();

    useEffect(() => {
        const response = api.post("/user/logout/blacklist/", {
            refresh_token: localStorage.getItem("refresh_token"),
        });
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        api.defaults.headers["Authorization"] = null;
        history("/login");
    });
    
    return <div>Logout</div>;
}
