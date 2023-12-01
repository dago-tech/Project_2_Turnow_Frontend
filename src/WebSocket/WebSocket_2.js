import { w3cwebsocket as W3CWebSocket } from 'websocket';

const WS_PROTOCOL = window.location.protocol === 'https:' ? 'wss' : 'ws';
// const WS_HOST = window.location.host;
const WS_HOST = 'localhost:8000'


class WebSocketInstance {
    constructor() {
        this.socket = null;
        this.callbacks = {};
    }

    connect() {
        this.socket = new W3CWebSocket(`ws://${WS_HOST}/ws/turnow/`);

        this.socket.onopen = () => {
            console.log('Conectado al WebSocket');
        };

        this.socket.onmessage = (event) => {
            this.handleMessage(JSON.parse(event.data));
            
        };

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

    addCallbacks(eventName, callback) {
        this.callbacks[eventName] = this.callbacks[eventName] || [];
        this.callbacks[eventName].push(callback);
    }

    sendMessage(eventName, data) {
        const payload = {
            event: eventName,
            data,
        };
        this.socket.send(JSON.stringify(payload));
    }

    handleMessage(message) {
        const callbacks = this.callbacks[message.event] || [];
        callbacks.forEach((callback) => {
            callback(message.data);
        });
    }
}

const WebSocketInstanc = new WebSocketInstance();

export default WebSocketInstanc;