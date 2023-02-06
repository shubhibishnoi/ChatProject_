import React, { useState } from "react"
import "./App.css";
import UserInput from "./components/UserInput";
import ChatScreen from "./components/ChatScreen";
const App = () => {
  const [auth, setAuth] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [userName, setUserName] = useState("");
  const handleJoinBtn = (channelName, userName) => {
    setAuth(true);
    setChannelName(channelName);
    setUserName(userName);
  };

  return (
    <div className="App">
      {auth ? (
        <ChatScreen channelName={channelName} userName={userName} />
      ) : (
        <UserInput handleJoinBtn={handleJoinBtn} />
      )}
    </div>
  );
};

export default App;
