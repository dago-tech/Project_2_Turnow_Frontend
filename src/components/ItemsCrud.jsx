import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import Loader from "./Loader";
import ItemsTable from "./ItemsTable";
import { getData, deleteData } from "../helpers/axios";

const ItemsCrud = ({ endpoint, displayField }) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        setLoading(true);

        getData(endpoint)
            .then((response) => {
                setData(response);
                setError(null);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const deleteRegister = (id, name) => {
        setShowModal(true);
        setId(id)
    };

    const handleConfirmDelete = () => {
        // Lógica para realizar el delete
        let delete_endpoint = `${endpoint}delete/${id}/`;

        deleteData(delete_endpoint)
            .then(() => {
                let newData = data.filter((el) => el.id !== id);
                setData(newData);
                setError(null);
            })
            .catch((error) => {
                setData(null);
                setError(error);
            });
        console.log('Registro eliminado');

        // Cierra el modal después de confirmar
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        // Lógica para cancelar la eliminación
        console.log('Eliminación cancelada');

        // Cierra el modal
        setShowModal(false);
    };

    return (
        <div>
            {loading && <Loader />}
            {error && <p className="error">{`Error: ${error.message}`}</p>}
            {data && (
                <ItemsTable
                    data={data}
                    displayField={displayField}
                    deleteData={deleteRegister}
                    endpoint={endpoint}
                />
            )}
            <div>
                {/*Overlay is a visual layer that is overlaid on top of the main content 
                of the page or application when the modal is displayed. */}
                <Modal 
                    isOpen={showModal}
                    contentLabel="Delete Modal"
                    className="modal-content"
                    overlayClassName="modal-overlay" // 
                >
                    <p>¿Do you want to delete this register?</p>
                    <button onClick={handleConfirmDelete}>Delete</button>
                    <button onClick={handleCancelDelete}>Cancel</button>
                </Modal>
            </div>
        </div>
    );
};

export default ItemsCrud;
