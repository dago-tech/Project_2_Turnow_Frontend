// const turnSocket = new WebSocket(
//     'ws://'
//     + window.location.host
//     + '/ws/turnow/'
// );

// turnSocket.onmessage = function(e) {
//     console.log(e)
//     const data = JSON.parse(e.data);
//     console.log(data)
// }

// let message = "nuestro mensaje"
// turnSocket.send(JSON.stringify({
//                 'message': message
//             }));

// export default turnSocket


class WebSocketInstance {
    constructor() {
        this.socket = null;
        this.callbacks = {};
    }

    connect() {
        this.socket = new WebSocket(
            'ws://'
            + 'localhost:8000'
            + '/ws/turnow/'
        );

        this.socket.onopen = () => {
            console.log('Conectado al WebSocket');
        };

        this.socket.onmessage = function(e) {
            console.log(e)
            const data = JSON.parse(e.data);
            console.log(data)
            return data
        }

        this.socket.onclose = () => {
            console.log('Desconectado del WebSocket');
        };
    }

    disconnect() {
            if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    sendMessage(data) {
        // const payload = {
        // event: eventName,
        // data,
        // };
        this.socket.send(JSON.stringify(data));
    }

    // handleMessage(message) {
    //     const callbacks = this.callbacks[message.event] || [];
    //     callbacks.forEach((callback) => {
    //     callback(message.data);
    //     });
    // }
}

const turnSocketInstance = new WebSocketInstance();

export default turnSocketInstance;