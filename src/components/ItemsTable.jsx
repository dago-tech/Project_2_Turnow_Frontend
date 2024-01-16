import React from "react";
import { Link } from "react-router-dom";
import ItemsTableRow from "./ItemsTableRow";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ItemsTable = ({ data, displayField, deleteData, endpoint }) => {
    let field = displayField.replace("_", " ");
    let name = field.charAt(0).toUpperCase() + field.slice(1);

    const theme = createTheme({
        palette: {
            primary: {
                main: "#34495E",
            },
        },
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
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
                                    {/* <button>Create</button> */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                    >
                                        Create
                                    </Button>

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
            </ThemeProvider>
        </div>
    );
};

export default ItemsTable;
