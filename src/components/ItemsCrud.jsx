import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Message from "./Message";
import ItemsTable from "./ItemsTable";
import { getData, deleteData } from "../axios";


const ItemsCrud = ({endpoint, displayField}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setLoading(true);
        
        getData(endpoint).then(response => {
            setData(response);
            setError(null);
        })
        .catch(error => {
            setError(error);
        }).finally(()=>{
            setLoading(false);
        });
                
    }, []);


    const deleteRegister = (id, name) => {

        let isDelete = window.confirm(
            `¿Do you want to delete the register: ${name}?`
        );

        if (isDelete) {
            let delete_endpoint = `${endpoint}delete/${id}`;
            
            deleteData(delete_endpoint).then(response => {
                let newData = data.filter((el) => el.id !== id);
                setData(newData);
                setError(null);
            })
            .catch(error => {
                setData(null);
                setError(error);
            })
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
                    deleteData={deleteRegister}
                    endpoint={endpoint}
                />
            )} 
        </div>
    );
};

export default ItemsCrud;
