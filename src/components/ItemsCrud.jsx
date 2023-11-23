import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import ItemsTable from "./ItemsTable";
import api from "../axios";

const ItemsCrud = ({endpoint, displayField}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    /*Creamos un efecto para que solo la primera vez que se carga el componente se 
    haga la peticion fetch a la ulr */
    useEffect(() => {

        setLoading(true);
        
        const getData = async () => {
            try {
                const result = await api.get(endpoint);  // Reemplaza con tu ruta específica
                setData(result.data);
                setError(null);
            } catch (error) {
                setData(null);
                setError(error);
                console.error('Error in GET request:', error);
                throw error;
            } finally {
                setLoading(false);
            }
        };  
        getData();
        }, []);


    const deleteData = (id, name) => {

        let isDelete = window.confirm(
            `¿Do you want to delete the register: ${name}?`
        );

        if (isDelete) {
            let delete_endpoint = `${endpoint}delete/${id}`;
            
            const deleteDataAux = async () => {
                try {
                    const result = await api.delete(delete_endpoint);  // Reemplaza con tu ruta específica
                    let newData = data.filter((el) => el.id !== id);
                    setData(newData);
                    setError(null);
                } catch (error) {
                    setData(null);
                    setError(error);
                    console.error('Error in DELETE request:', error);
                    throw error;
                } 
            };  
            deleteDataAux();
        }
    };

    return (
        <div>
            {loading && <Loader />}
            {error && (
                <Message
                    msg={`Error: ${error.message}`}
                />
            )}
            {data && (
                <ItemsTable
                    data={data}
                    displayField={displayField}
                    deleteData={deleteData}
                    endpoint={endpoint}
                />
            )}
            <Link to={`/user/admin/${endpoint}create`}>
                <button>Create</button>
            </Link>
        </div>
    );
};

export default ItemsCrud;
