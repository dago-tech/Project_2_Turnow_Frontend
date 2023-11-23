import React from "react";
import ItemsTableRow from "./ItemsTableRow";


const ItemsTable = ({ data, displayField, deleteData, endpoint}) => {
    
    let field = displayField.replace("_", " ")
    let name = field.charAt(0).toUpperCase() + field.slice(1)
    return (
        <div>
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>{name}</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
                data.map((el) => (
                <ItemsTableRow
                    key={el.id}
                    el={el}
                    displayField={displayField}
                    deleteData={deleteData}
                    endpoint={endpoint}
                />
                ))
            ) : (
                // Colspan indica el numero de columnas que ocupará la celda
                <tr>
                <td colSpan="3">No data</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
    };

    export default ItemsTable;
