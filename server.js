const net = require("node:net");

const server = net.createServer();

const sockets = [];

server.on("connection", (socket) => {
  console.log("New connection to server");
  sockets.push(socket);

  socket.on("data", (data) => {
    sockets.forEach((socket) => {
      socket.write(data);
    });
  });

  socket.on("error", (err) => {
    console.log("Client disconnected ", err.name);
  });
});

server.listen(4080, "127.0.0.1", () => {
  console.log("Server is open: ", server.address());
});
