import React from "react";
import { Link } from "react-router-dom";
import ItemsTableRow from "./ItemsTableRow";

const ItemsTable = ({ data, displayField, deleteData, endpoint }) => {
    let field = displayField.replace("_", " ");
    let name = field.charAt(0).toUpperCase() + field.slice(1);

    return (
        <div>
            <table>
                <thead>
                    <tr style={{ textAlign: "right" }}>
                        <th className="no_side_borders"></th>
                        <th className="no_side_borders"></th>
                        <th
                            className="no_side_borders"
                            style={{ textAlign: "right" }}
                        >
                            <Link to={`/user_admin/${endpoint}create`}>
                                <button>Create</button>
                            </Link>
                        </th>
                    </tr>
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
                        // Colspan indicates the number of columns that the cell will occupy
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
