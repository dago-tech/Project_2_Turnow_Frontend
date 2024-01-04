import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotAuthorized = () => {
    /*Shows a message for 2 seconds indicating that a login is missing */
    const history = useNavigate();

    useEffect(()=>{
        const timer = setTimeout(() => {
            history('/home')
        }, 2000);
    
        return () => clearTimeout(timer);
    },[])
    

    return (
        <div>
            <p className="error">You are not authorized, log in as an Administrator 
            or Desk User</p>
        </div>
    )
}

export default NotAuthorized;