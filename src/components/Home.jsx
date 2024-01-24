import { Link } from "react-router-dom";
import { Header } from "./Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

export function Home() {
  /*Index  page, shows main application menu */

  const theme = createTheme({
    palette: {
      primary: {
        main: "#34495E",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />

        <div style={{ textAlign: "center" }}>
          <h1 className="main-title">TURNOW</h1>
          <p className="sub-title">
            Your Time, Your Queue: Manage Your Turns Smartly.
          </p>

          <Link to="/client">
            <Button className="principal_button" variant="contained">
              Clients
            </Button>
          </Link>
          <br />
          <br />
          <Link to="/notification">
            <Button className="principal_button" variant="contained">
              Notification Screen
            </Button>
          </Link>
          <br />
          <br />
          <Link to="/user_admin">
            <Button className="principal_button" variant="contained">
              Admin User
            </Button>
          </Link>
          <br />
          <br />
          <Link to="/user_desk">
            <Button className="principal_button" variant="contained">
              Desk User
            </Button>
          </Link>
        </div>
      </ThemeProvider>
    </>
  );
}
