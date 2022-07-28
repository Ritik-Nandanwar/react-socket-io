import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const submitHandle = () => {
    if (!username || !roomId) {
      alert("Please enter username AND roomId");
    }
    socket.emit("join_room", {
      data: {
        username,
        roomId,
      },
    });
  };
  return (
    <>
      <div className="w-[300px] mx-auto flex items-center justify-center flex-col mt-24 p-4 rounded-md bg-black/90">
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Enter username"
          autocomplete="false"
          className="px-4 py-2 w-full"
        />
        <input
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
          type="text"
          placeholder="Enter Room ID"
          className="w-full px-4 py-2 my-4"
        />
        <button
          className="px-4 py-3 font-bold w-full bg-purple-300 rounded"
          onClick={submitHandle}
        >
          Join
        </button>
      </div>
    </>
  );
}

export default App;
