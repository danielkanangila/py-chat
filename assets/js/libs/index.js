const io = require("./socket.io");

export const SOCKET_URL = `${location.protocol}//${document.domain}:${location.port}`;
export const socket = io.connect(SOCKET_URL);