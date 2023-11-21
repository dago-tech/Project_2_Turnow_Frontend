import React from "react";
import ItemsTableRow from "./ItemsTableRow";


const ItemsTable = ({ data, deleteData }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <ItemsTableRow
                key={el.id}
                el={el}
                deleteData={deleteData}
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
