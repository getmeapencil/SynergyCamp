class SocketRegistry {
  constructor() {
    this.users = new Map();
  }

  add(userId, socket) {
    if (!this.users.has(userId)) {
      this.users.set(userId, []);
    }
    this.users.get(userId).push(socket);
  }

  remove(userId, socket) {
    if (this.users.has(userId)) {
      const userSockets = this.users.get(userId).filter((s) => s.id !== socket.id);
      if (userSockets.length === 0) {
        this.users.delete(userId);
      } else {
        this.users.set(userId, userSockets);
      }
    }
  }
}

export default new SocketRegistry();
