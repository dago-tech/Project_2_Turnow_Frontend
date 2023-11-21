import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { getData } from '../axios';
import ItemsTable from "./ItemsTable";
import api from "../axios";

const ItemsCrud = ({endpoint}) => {
    const [data, setData] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
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
            // Maneja el error según tus necesidades
            } finally {
                // Este bloque siempre se ejecutará
                setLoading(false);
            }
        };  
        getData();   

        }, []);


    const deleteData = (id) => {
        let isDelete = window.confirm(
            `¿Do you want to delete '${id} register'?`
        );

        if (isDelete) {
            let delete_endpoint = `${endpoint}delete/${id}`;
            // let options = {
            //     headers: { "content-type": "application/json" },
            // };
            
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
                    //throw error;
                // Maneja el error según tus necesidades
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
                // setDataToEdit={setDataToEdit}
                deleteData={deleteData}
                />
            )}
            <Link to={`/users/admin/categories/create`}>
                <button>Create</button>
            </Link>
        </div>
    );
};

export default ItemsCrud;
