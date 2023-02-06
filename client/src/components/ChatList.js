import React from "react";

const ChatList = ({ chats, username }) => {
  return (
    <div className="msger-chat">

{chats.map((chat) => 
{
    return (
      <div
        key={Math.random()}
        className={
          chat.username === username ? "msg right-msg" : "msg left-msg"
        }
      >
         <div className="msg-bubble">
            <div className="msg-info">
          {chat.username !== username ? (
            <div className="msg-info-name">{chat.username}</div>
          ) : (
            <div className="msg-info-name">you</div>
          )}
          <div className="msg-info-time">{chat.time}</div>
          </div>
          <div className="msg-text">
            {chat.message} 
          </div>
       
      </div>
       </div>
    )
  
}



) 
      }
      
    </div>
  );
};

export default ChatList;
