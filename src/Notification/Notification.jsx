import { useEffect, useState } from "react";
import { getData } from "../helpers/axios";
import { useWebSocket } from "../context/WebSocketContext";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { errorMessage } from "../helpers/errorMessage";

export function Notification() {
    /* Shows a list of turns called by a desk user */

    const endpoint = "turn/notification";

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { notificationChange } = useWebSocket();

    useEffect(() => {
        setLoading(true);
        getData(endpoint)
            .then((response) => {
                setData(response);
                setError(null);
                setLoading(false);
            })
            .catch((error) => {
                setError(errorMessage(error));
                setLoading(false);
            });

    }, [notificationChange]);
    
    //console.log(notificationChange)
    return (
        <>
            <div>
                <BackButton/>
            </div>
            <div className="center">
                <h2>Turn notification</h2>
                {error && <p className="error">{error}</p>}
                
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
            </div>
        </>
    );
}
