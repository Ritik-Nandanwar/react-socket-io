import { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function App() {
  const [message, setMessage] = useState("");
  const handleClick = () => {
    socket.emit("message", { message: message });
    setMessage("");
  };
  return (
    <div className="App text-center p-6">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="enter a message"
        className="p-4 text-white font-xl font-semibold bg-gray-600 rounded-l-md mr-2"
      />
      <button
        className="p-4 rounded-r-md bg-black/90 text-white"
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
}

export default App;
