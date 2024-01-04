import React from "react";
import { useNavigate } from "react-router-dom";

const ItemsTableRow = ({ el, displayField, deleteData, endpoint }) => {
    /*Renders each row of ItemsTable component */
    
    const history = useNavigate();
    let id = el["id"];
    let field = el[displayField];

    const currentPath = location.pathname.split('/')[1];
    let destinationPath = "";

    const handleLinkClick = () => {
        /*Change destination path depending on currentPath */
        if (currentPath == "user_desk"){
            destinationPath = `/user_desk/${endpoint}edit/${id}`
        } else {
            destinationPath = `/user_admin/${endpoint}edit/${id}`;
        }
        history({
            pathname: destinationPath,
        });
    };

    return (
        <tr>
            <td>{id}</td>
            <td>{field}</td>
            <td>
                <button onClick={handleLinkClick}>Edit</button>
                <button onClick={() => deleteData(id, field)}>Delete</button>
            </td>
        </tr>
    );
};

export default ItemsTableRow;
