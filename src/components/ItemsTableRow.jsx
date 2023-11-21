import React from "react";
import { Link } from "react-router-dom";

const ItemsTableRow = ({ el, deleteData}) => {
    let { name, id } = el;

    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>              
                <Link to={`/users/admin/categories/edit/${id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => deleteData(id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ItemsTableRow;