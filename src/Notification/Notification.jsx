import { useEffect, useState } from "react";
import { getData } from "../helpers/axios";
import { useWebSocket } from "../context/WebSocketContext";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

export function Notification() {
    const endpoint = "turn/notification";

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { mensajeRecibido, notificationChange } = useWebSocket();

    useEffect(() => {
        setLoading(true);
        getData(endpoint)
            .then((response) => {
                setData(response);
                setError(null);
                setLoading(false);
                console.log("cambiando listado");
            })
            .catch((error) => {
                console.error("Error:", error);
                setError(error);
                setLoading(false);
            });

    }, [notificationChange]);
    
    console.log(notificationChange)
    console.log(data)

    return (
        <>
            <div>
                <BackButton/>
            </div>
            <div className="center">
                <h2>Turn notification</h2>
                {/* {loading && <Loader />} */}
                {error && <p className="error">{error.message}</p>}
                
                {loading ? (
                    <Loader />
                    ) : (
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
                )}

                {typeof data === "object" && (
                    <p className="error">{data.message}</p>
                )}
                {/* <p>Mensaje Recibido: {mensajeRecibido}</p> */}
            </div>
        </>
    );
}
