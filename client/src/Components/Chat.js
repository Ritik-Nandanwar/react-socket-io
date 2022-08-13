import { useEffect, useState } from "react";
import userLogo from "../assets/userlogo.png";
export default function Chat({ socket, username, roomID }) {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const handleMessageSubmit = async () => {
    // e.preventDefault();
    const messageData = {
      message,
      username,
      roomID,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes() +
        ":" +
        new Date(Date.now()).getSeconds(),
    };
    await socket.emit("sendMessage", messageData);
    // setAllMessage((list) => [...list, messageData]);
  };
  useEffect(() => {
    socket.on("receiveMsg", (data) => {
      console.log(data);
      setAllMessage((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <>
      <div className="container mx-auto max-w-[700px] ">
        <div className="logo text-2xl py-2 text-center bg-blue-200">
          cHatwImdow
        </div>
        <div className="">
          <div className="chat-area bg-slate-900 overflow-y-scroll p-2 h-[600px] flex flex-col">
            {allMessage.map((msg) => {
              return (
                // <div
                //   key={msg.time}
                //   className="message other mb-2 mx- rounded justify-around"
                // >
                //   <div className="flex my">
                //     <p className="text-white  rounded-md bg-orange-300 mx-2 p-2 w-[450px]">
                //       {msg.message}
                //     </p>
                //     <img
                //       src={userLogo}
                //       className="w-[40px] h-[40px] right-10 rounded-full"
                //       alt=""
                //     />
                //   </div>
                // </div>
                <h2>{msg.message}</h2>
              );
            })}
          </div>
        </div>
        <div className="input-area">
          <div className="flex">
            <input
              type="text"
              className="p-2 text-xl font-bold bg-slate-600 text-white w-full focus:outline-none"
              placeholder="Type message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              // type="submit"
              onClick={handleMessageSubmit}
              className="text-black text-4xl bg-slate-100 px-2 cursor-pointer"
            >
              &#8883;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
