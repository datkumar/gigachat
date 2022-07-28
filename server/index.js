const express = require("express");
const http = require("http");
// const cors = require("cors");
const socketIo = require("socket.io");

const PORT = 3001;

const app = express();
// app.use(cors());

const server = http.createServer(app);

const io = socketIo(server, {
	pingTimeout: 30000,
	path: "/chat",
	cors: {
		origin: "http://127.0.0.1:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log(`User Connected: ${socket.id}`);

	socket.on("join_room", (room_no) => {
		socket.join(room_no);
        console.log(`User with ID: ${socket.id} joined room: ${room_no}`);
	});

    socket.on("send_message", (data) => {
		socket.to(data.room).emit("receive_message", data)
	});

	socket.on("disconnect", (reason) => {
		console.log(`User ${socket.id} disconnected due to: ${reason}`);
	});
});

server.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	}
	console.log(`Server Listening on PORT ${PORT}`);
});
