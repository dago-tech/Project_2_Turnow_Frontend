import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getData } from '../helpers/axios';
import NotAuthorizated from './NotAuthorizated';

const PrivateRoute = ({ element: Element, adminRequired = false, ...rest }) => {
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();

    const accessToken = localStorage.getItem('access_token');

    useEffect(()=>{

        const checkAuthentication = async () => {
            if (accessToken) {
                const tokenParts = JSON.parse(atob(accessToken.split('.')[1]));
                console.log(tokenParts)
                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(now)
                if (tokenParts.exp > now) {
                    setIsAuthenticated(true)
                    console.log('Autenticacion verificada')
                    if (adminRequired) {
                        try {
                            const response = await getData(`user/is_admin/${tokenParts.user_id}/`)
                            console.log(`Is admin: ${response}`)
                            setIsAdmin(response)
                        } catch (error) {
                            console.log(error)
                            // setIsAuthenticated(false); // Tratar el error como autenticación no exitosa
                            // setIsAdmin(false);
                        }
                    } else {
                        console.log('Admin not required')
                        setIsAdmin(false);
                    }
                } else {
                    console.log('Token expirado')
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                }
            } else {
                console.log('Auth Token not found')
                setIsAuthenticated(false); 
                setIsAdmin(false);
            }
        }
        const timeoutId = setTimeout(() => {
            // Si la verificación de autenticación lleva más de 5 segundos, cambiar el estado a no autenticado
            console.log('Tiempo cumplido')
            setIsAuthenticated(false);
            setIsAdmin(false);
        }, 5000);

        checkAuthentication().then(() => {
            // Limpiar el timeout cuando la verificación de autenticación se completa
            console.log('Se cumple promesa y Se limpia temporizador')
            console.log(isAuthenticated)
            clearTimeout(timeoutId);
        });
       
        // Limpiar el timeout cuando el componente se desmonta o cuando la verificación se completa antes del tiempo límite
        // return () => clearTimeout(timeoutId);
    },[])

    console.log(isAuthenticated)

    if (isAuthenticated===null || isAdmin===null) {
        console.log('Verificando autenticación...')
        return <p>Verificando autenticación...</p>;
    }

    // Renderiza el componente si pasa las verificaciones anteriores
    if (isAuthenticated && (!adminRequired || (adminRequired && isAdmin))) {
        return <Element/>
    } else {
        return <NotAuthorizated/>
    }  
};

export default PrivateRoute;