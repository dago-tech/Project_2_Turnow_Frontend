import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NotAuthorized from "./NotAuthorized";
import { checkAuthentication } from "../../helpers/checkAuth";

const PrivateRoute = ({ element: Element, adminRequired = false, ...rest }) => {
    /*Manages private routes, allows access depending on if user is an admin or not */
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } =
        useAuth();

    useEffect(() => {
        checkAuthentication()
            .then((response) => {
                setIsAuthenticated(response.authenticated);
                setIsAdmin(response.isAdmin);
            })
            .catch((error) => {
                setIsAuthenticated(false);
                setIsAdmin(false);
                console.error(error);
            });
    }, []);

    if (isAuthenticated === null || isAdmin === null) {
        return <p>Verifying authentication...</p>;
    }

    // If pass verifications, render the component
    if (isAuthenticated && (!adminRequired || (adminRequired && isAdmin))) {
        return <Element />;
    } else {
        return <NotAuthorized />;
    }
};

export default PrivateRoute;
