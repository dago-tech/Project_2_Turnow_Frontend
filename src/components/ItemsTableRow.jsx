import React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ItemsTableRow = ({ el, displayField, deleteData, endpoint }) => {
  /*Renders each row of ItemsTable component */

  const history = useNavigate();
  let id = el["id"];
  let field = el[displayField];

  const currentPath = location.pathname.split("/")[1];
  let destinationPath = "";

  const theme = createTheme({
    palette: {
      primary: {
        main: "#34495E",
      },
    },
  });

  const handleLinkClick = () => {
    /*Change destination path depending on currentPath */
    if (currentPath == "user_desk") {
      destinationPath = `/user_desk/${endpoint}edit/${id}`;
    } else {
      destinationPath = `/user_admin/${endpoint}edit/${id}`;
    }
    history({
      pathname: destinationPath,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <tr>
        <td>{id}</td>
        <td>{field}</td>
        <td>
          <Button
            onClick={handleLinkClick}
            variant="text"
            size="small"
            startIcon={<EditIcon />}
          >
            Edit
          </Button>

          <Button
            onClick={() => deleteData(id, field)}
            variant="text"
            size="small"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </td>
      </tr>
    </ThemeProvider>
  );
};

export default ItemsTableRow;
