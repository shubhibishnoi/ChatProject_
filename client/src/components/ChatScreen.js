import React, { useEffect, useState } from 'react'
import Pusher from "pusher-js";
import ChatList from './ChatList';
import ChatInput from './ChatInput';
import axios from "axios";

const ChatScreen = ({ channelName, userName }) => {
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState();
  const [userCount,setUserCount]=useState(1);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/previousChat`)
      .then((res) => {
        setChats(res.data);
      }).catch(e=>console.log("error--",e));

    const pusher = new Pusher(process.env.REACT_APP_KEY, {
      cluster: process.env.REACT_APP_CLUSTER,
      encrypted: true,
    });

    const channel = pusher.subscribe(channelName);
    channel.bind("message", (data) => {
      console.log("before settin--",data);
      setMsg(data);
      console.log("message notified");
    });

    channel.bind('pusher:subscription_count', (data) => {
      setUserCount(data.subscription_count);
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, []);

  useEffect(() => {
    if (msg) setChats([...chats, msg]);
  }, [msg]);

  return (
    <div className="msger">
      <header className="msger-header">
        <div className="msger-header-title">
          Welcome, {userName}
        </div>
        <div className="msger-header-end">
        {([0,1].includes(userCount))?"Active User":"Active Users"}:{userCount}
        </div>
      </header>
      <ChatList chats={chats} username={userName} />

      <ChatInput channelName={channelName} username={userName} />
    </div>
  );
};

export default ChatScreen;
