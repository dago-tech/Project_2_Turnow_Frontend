import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClientContext from "../context/ClientContext";
import { getData } from "../helpers/axios";
import BackButton from "../components/BackButton";

export function ClientPriority() {
    const { setIdPriority } = useContext(ClientContext);

    const history = useNavigate();
    const [priorities, setPriorities] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        // Get the priority list

        getData("priority/")
            .then((response) => {
                setPriorities(response);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleSelection = (priority_id) => {
        setSelected(priority_id);
    };

    const handleSubmit = () => {
        setIdPriority(selected);

        history({
            pathname: "/client/category/",
        });
    };

    return (
        <>  
            <div style={{ textAlign: "left" }}>
                <BackButton/>
            </div>
            <h2 style={{ textAlign: "center" }}>Select a priority:</h2>
            <ul style={{ textAlign: "center" }}>
                {priorities.map((priority) => (
                    <li key={priority.id}>
                        <button
                            onClick={() => handleSelection(priority.id)}
                            className={`${
                                selected === priority.id ? "selected" : ""
                            } id_button`}
                        >
                            {priority.name}
                        </button>
                    </li>
                ))}
            </ul>
            <div style={{ textAlign: "right" }}>
                <button
                    className="next_button"
                    onClick={handleSubmit}
                    disabled={!selected}
                >
                    Next
                </button>
            </div>
        </>
    );
}
