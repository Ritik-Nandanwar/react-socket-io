import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");
  const [msg, setMsg] = useState("");
  const joinRoom = () => {
    const data = {
      username,
      roomID,
    };
    socket.emit("joinRoom", data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      msg,
      roomID,
    };
    await socket.emit("sendMessage", data);
  };
  useEffect(() => {
    socket.on("receiveMsg", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <>
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter message"
            className="mt-20 px-3 py-3 m-2 font-bold bg-fuchsia-500"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button
            type="submit"
            className="m-2 py-3 px-4 bg-green-400 capitalize font-bold"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
