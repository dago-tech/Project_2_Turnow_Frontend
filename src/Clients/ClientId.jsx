import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../helpers/axios";
import ClientContext from "../context/ClientContext";
import "../styles/main.css";

export function ClientId() {
    const { setIdClient } = useContext(ClientContext);

    const endpoint = "client/create/";
    const history = useNavigate();
    const [idType, setIdType] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [selected, setSelected] = useState("");

    const handleSelection = (type) => {
        setIdType(type);
        setSelected(type);
    };

    const handleClick = (number) => {
        setIdNumber((prevNumber) => prevNumber + number);
    };

    const handleErase = () => {
        setIdNumber((prevNumber) => prevNumber.slice(0, -1));
    };

    const handleSubmit = () => {
        const data = {
            id_type: idType,
            personal_id: idNumber,
        };

        postData(endpoint, data).then((response) => {
            setIdClient(response.id);
        });

        history({
            pathname: "/client/priority/",
        });
    };

    return (
        <>
            <div className={"container"}>
                <div style={{ margin: 20, textAlign: "right" }}>
                    <h2>Identification type:</h2>
                    <ul style={{ padding: 0 }}>
                        <li>
                            <button
                                onClick={() => handleSelection("cedula")}
                                className={`${
                                    selected === "cedula" ? "selected" : ""
                                } id_button`}
                            >
                                Cédula de Ciudadanía
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    handleSelection("tarjeta_identidad")
                                }
                                className={`${
                                    selected === "tarjeta_identidad"
                                        ? "selected"
                                        : ""
                                } id_button`}
                            >
                                Tarjeta de Identidad
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleSelection("pasaporte")}
                                className={`${
                                    selected === "pasaporte" ? "selected" : ""
                                } id_button`}
                            >
                                Pasaporte
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() =>
                                    handleSelection("cedula_extrangería")
                                }
                                className={`${
                                    selected === "cedula_extrangería"
                                        ? "selected"
                                        : ""
                                } id_button`}
                            >
                                Cedula de Extrangería
                            </button>
                        </li>
                    </ul>
                </div>

                <div style={{ textAlign: "center", width: "200px" }}>
                    <h2>Enter your ID number:</h2>
                    <div
                        style={{
                            minHeight: "40px",
                            width: "120px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                            margin: "auto",
                        }}
                    >
                        <p style={{ margin: 0, padding: "10px" }}>{idNumber}</p>
                    </div>
                    <div>
                        {/* Numeric keyboard in a table */}
                        <table style={{ margin: "auto" }}>
                            <tbody>
                                {[0, 1, 2].map((row) => (
                                    <tr key={row}>
                                        {[1, 2, 3].map((column) => {
                                            const number = row * 3 + column;
                                            return (
                                                <td
                                                    key={column}
                                                    className="no_borders"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleClick(number)
                                                        }
                                                    >
                                                        {number}
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                                <tr>
                                    <td className="no_borders">
                                        <button onClick={() => handleClick(0)}>
                                            0
                                        </button>
                                    </td>
                                    <td colSpan="2" className="no_borders">
                                        <button onClick={handleErase}>
                                            Erase
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: "right" }}>
                <button
                    className={"next_button"}
                    onClick={handleSubmit}
                    disabled={!idType || !idNumber}
                >
                    Next
                </button>
            </div>
        </>
    );
}
