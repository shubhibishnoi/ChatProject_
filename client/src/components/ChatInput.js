import React, { useState } from "react";
import axios from "axios";

const ChatInput = ({ channelName, username }) => {
  const [message, setMessage] = useState("");
  const [showErr, setShowErr] = useState(false);
function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  }
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      setShowErr(false);
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/message?channel=${channelName}`, {
          username: username,
          message: message,
          time:formatDate(new Date())
        })
        .then(() => {
          setMessage("");
        }).catch(e=>console.log("error--",e));
    } else setShowErr(true);
  };

  return (
    <form className="msger-inputarea" onSubmit={(e) => sendMessage(e)}>
      <input
        type="text"
        className="msger-input"
        placeholder="Enter your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="msger-send-btn" type="submit">
        Send
      </button>
      {showErr && <div className="errorText">Enter your message</div>}
    </form>
  );
};

export default ChatInput;
