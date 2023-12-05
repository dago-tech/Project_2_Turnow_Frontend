import React from "react";
import { Link } from "react-router-dom";

const ItemsTableRow = ({ el, displayField, deleteData, endpoint }) => {
    let id = el["id"];
    let field = el[displayField];

    return (
        <tr>
            <td>{id}</td>
            <td>{field}</td>
            <td>
                <Link to={`/user_admin/${endpoint}edit/${id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => deleteData(id, field)}>Delete</button>
            </td>
        </tr>
    );
};

export default ItemsTableRow;
