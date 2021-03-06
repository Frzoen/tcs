export const System = function System(sockets) {
    this.sockets = sockets;
};

System.prototype.shutdown = function shutdown() {
    if (this.sockets.io.connected) {
        this.sockets.io.emit('shutdown');
    }
};
