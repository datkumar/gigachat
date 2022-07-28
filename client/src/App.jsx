import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Chat from "./components/Chat";
import "./App.css";

const socket = io("http://localhost:3001", {
	path: "/chat",
});

function App() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [showChat, setShowChat] = useState(false);

	const joinRoom = () => {
		if (username !== "" && room !== "") {
			socket.emit("join_room", room);
			setShowChat(true);
		}
	};

	return (
		<div className="App">
			{!showChat ? (
				<div className="joinChatContainer">
					<h3>Join Room</h3>
					<input
						type="text"
						placeholder="Enter Username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>
					<input
						type="text"
						placeholder="Enter Room no."
						onChange={(e) => {
							setRoom(e.target.value);
						}}
					/>
					<button onClick={joinRoom}>JOIN</button>
				</div>
			) : (
				<Chat socket={socket} username={username} room={room} />
			)}
		</div>
	);
}

export default App;


// useEffect(() => {
//     socket.on("receive_message", (data) => {
//         setMsgReceived(data.msg);
//     });
// }, []);

// return (
// 	<div>
// 		<input
// 			type="text"
// 			placeholder="Enter Room Number"
// 			onChange={(e) => setRoom(e.target.value)}
// 		/>
// 		<button onClick={joinRoom}>Join Room</button>
// 		<br />
// 		<input
// 			type="text"
// 			placeholder="Enter Message"
// 			onChange={(e) => setMsg(e.target.value)}
// 		/>
// 		<button onClick={sendMessage}>Send</button>
// 		<h1>Message: </h1>
// 		{msgReceived}
// 	</div>
// );
