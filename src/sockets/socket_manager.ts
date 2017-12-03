import EventCode from "enums/event-code";
export class SocketManager {
  private clients = {};

  public getClient(id: number) {
    return this.clients[id];
  }

  public registerClient(id: number, socket) {
    if (!this.clients[id] || this.clients[id].length == 0) {
      this.clients[id] = [];
    }

    let found = this.clients[id].find(item => item.id == socket.id);
    if (!found) {
      this.clients[id].push(socket);
    }
  }

  public removeClient(userId, socketId) {
    this.clients[userId] = this.clients[userId].filter(socket => socket.id != socketId);
    if (this.clients[userId].length == 0) {
      delete this.clients[userId];
    }
  }

  public sendTo(id: number, event: EventCode, data) {
    let clients = this.clients[id];
    if (!clients) return;



    clients.forEach(client => {
      if (!client || client.disconnected) {
        console.warn("SocketManager::sendTo", id, client.id, "is disconnected or not found");
      } else {
        console.log("Send to", id, client.id, event);
        client.emit(event, data);
      }
    })
  }

  public sendToMany(ids: number[], event: EventCode, data) {
    for (let id of ids) {
      this.sendTo(id, event, data);
    }
  }

  public sendToAll(event: EventCode, data) {
    let ids = this.getOnlineList();
    this.sendToMany(ids, event, data);
  }

  public getOnlineList() {
    let ids = Object.keys(this.clients)
      .map(x => parseInt(x))
      .filter(x => !Number.isNaN(x));
    return ids;
  }
}

const socketManager = new SocketManager();
export default socketManager;
