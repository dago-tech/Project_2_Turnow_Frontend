import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");

/*Create the ReactDOM root in the HTML element and renders the main component*/
ReactDOM.createRoot(document.getElementById("root")).render(
    /*React.StrictMode makes components to be rendered twice, only in dev mode */
    // <React.StrictMode>
    <App />
    //</React.StrictMode>,
);
