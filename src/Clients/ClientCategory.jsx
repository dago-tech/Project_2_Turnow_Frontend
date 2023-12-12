import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ClientContext from "../context/ClientContext";
import { getData } from "../helpers/axios";
import BackButton from "../components/BackButton";

export function ClientCategory() {
    const { setIdCategory } = useContext(ClientContext);
    const history = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        // Get the category list

        getData("category/")
            .then((response) => {
                setCategories(response);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const handleSelection = (category_id) => {
        setSelected(category_id);
    };

    const handleSubmit = () => {
        setIdCategory(selected);

        history({
            pathname: "/client/turn/",
        });
    };

    return (
        <>
            <div style={{ textAlign: "left" }}>
                <BackButton/>
            </div>
            <h2 style={{ textAlign: "center" }}>Select your category:</h2>

            <ul style={{ textAlign: "center" }}>
                {categories.map((category) => (
                    <li key={category.id}>
                        <button
                            onClick={() => handleSelection(category.id)}
                            className={`${
                                selected === category.id ? "selected" : ""
                            } id_button`}
                        >
                            {category.name}
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
