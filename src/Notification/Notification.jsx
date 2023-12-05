import { useEffect, useState } from "react";
import { getData } from "../helpers/axios";
import { useWebSocket } from "../context/WebSocketContext";

export function Notification() {
    const endpoint = "turn/notification";

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const { mensajeRecibido, notificationChange } = useWebSocket();

    useEffect(() => {
        getData(endpoint)
            .then((response) => {
                setData(response);
                setError(null);
                console.log("cambiando listado");
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error);
            });
    }, [notificationChange]);

    return (
        <div className="center">
            <h2>Turn notification</h2>
            {error && <p className="error">{error.message}</p>}

            <table style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Turn number</th>
                        <th>Service desk</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 &&
                        data.map((el) => (
                            <tr key={el.id}>
                                <td>{el.turn_number}</td>
                                <td>{el.desk}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {typeof data === "object" && (
                <p className="error">{data.message}</p>
            )}
            <p>Mensaje Recibido: {mensajeRecibido}</p>
        </div>
    );
}
