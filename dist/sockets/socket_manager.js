"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketManager {
    constructor() {
        this.clients = {};
    }
    getClient(id) {
        return this.clients[id];
    }
    registerClient(id, socket) {
        if (!this.clients[id] || this.clients[id].length == 0) {
            this.clients[id] = [];
        }
        let found = this.clients[id].find(item => item.id == socket.id);
        if (!found) {
            this.clients[id].push(socket);
        }
    }
    removeClient(userId, socketId) {
        this.clients[userId] = this.clients[userId].filter(socket => socket.id != socketId);
        if (this.clients[userId].length == 0) {
            delete this.clients[userId];
        }
    }
    sendTo(id, event, data) {
        let clients = this.clients[id];
        if (!clients)
            return;
        clients.forEach(client => {
            if (!client || client.disconnected) {
                console.warn("SocketManager::sendTo", id, client.id, "is disconnected or not found");
            }
            else {
                console.log("Send to", id, client.id, event);
                client.emit(event, data);
            }
        });
    }
    sendToMany(ids, event, data) {
        for (let id of ids) {
            this.sendTo(id, event, data);
        }
    }
    sendToAll(event, data) {
        let ids = this.getOnlineList();
        this.sendToMany(ids, event, data);
    }
    getOnlineList() {
        let ids = Object.keys(this.clients)
            .map(x => parseInt(x))
            .filter(x => !Number.isNaN(x));
        return ids;
    }
}
exports.SocketManager = SocketManager;
const socketManager = new SocketManager();
exports.default = socketManager;

//# sourceMappingURL=socket_manager.js.map
