import React, { useEffect, useState } from "react";
import Chat from "./Components/Chat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [msg, setMsg] = useState("");
  const joinRoom = () => {
    const data = {
      username,
      roomID,
    };
    socket.emit("joinRoom", data);
    setShowChat(true);
  };

  return (
    <>
      {!showChat ? (
        <div className="flex flex-col mx-auto max-w-[400px] text-center justify-center p-8 ">
          <input
            type="text"
            placeholder="Enter username"
            className="px-3 py-3 m-2 bg-slate-500 font-bold"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter roomID"
            className="px-3 py-3 m-2 bg-slate-500 font-bold"
            onChange={(e) => {
              setRoomID(e.target.value);
            }}
          />
          <button
            className="p-3 m-2 bg-black/70 capitalize font-bold"
            onClick={joinRoom}
          >
            PRESS
          </button>
        </div>
      ) : (
        <div className="w-[500px] mx-auto max-h-[200px]">
          <Chat username={username} roomID={roomID} socket={socket} />
        </div>
      )}
    </>
  );
}

export default App;
