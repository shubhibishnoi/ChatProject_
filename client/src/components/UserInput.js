import React, { useState } from 'react'

const UserInput = ({ handleJoinBtn }) => {
    // const [channelName, setChannelName] = useState("");
    const [userName, setUserName] = useState("");

    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (userName.trim().length !== 0) {
        handleJoinBtn("Global", userName);
        setShowError(false);
        // setChannelName("");
        setUserName("");
      } else {
        setShowError(true);
      }
    };
    return (
      <div className="midContainer">
        <h1 id="inlabel">Join To Chat</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="Container">

          {/*<div className="input-container">
            <span className="label">Room Name </span>
            <input
              type="text"
              className="input"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
            />
          </div>*/}
          <div className="input-container">
            <span className="label">Enter your Name</span>
            <input
              type="text"
              value={userName}
              className="input"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          {showError && (
            <div className="errorText">Field Required</div>
          )}
          <div className="btn-container">
            <button type="submit" className="btn">
              Join
            </button>
          </div>
        </form>
      </div>
    );
  };

  export default UserInput;
