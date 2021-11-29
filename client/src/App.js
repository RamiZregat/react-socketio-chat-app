import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showEmergency, setShowEmergency] = useState(true);
  const [showForm, setShowForm] = useState(true);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
      setShowForm(false)
    }
  };

  return (
    <>
    <div className="App">
      {showEmergency ? (
        <button
        class='emergencybtn'
          onClick={() => {
            setShowEmergency(false);
          }}
        >
          Emergancy
        </button>
      ) : showForm? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button class='joinroombtn' onClick={joinRoom}>Join A Room</button>
        </div>
      ): null}
      {showChat ? (
        <Chat socket={socket} username={username} room={room} />
      ) : null}
      </div>
    </>
  );
}

export default App;
