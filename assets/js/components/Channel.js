import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useLocalStorage } from "./../hooks";
import { socket } from "./../libs/";
import { groupByDate, formatDate, formatHour } from "./../utils";

const ON_MESSAGE_SENT = "ON_MESSAGE_SENT";
const ON_MESSAGES_ON_ = "ON_MESSAGES_ON_";

const Channel = () => {
  const [message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [currentChannel, setCurrentChannel] = useLocalStorage("channel");
  const [user, setUser] = useLocalStorage("user");
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/channels/${params.id}`)
      .then((res) => {
        const messages = setCurrentChannel({
          ...res.data,
          messages: groupByDate(res.data.messages),
        });
        setChannelName(res.data.channel.name);
      })
      .catch((error) => console.log(error.response));

    socket.on(`${ON_MESSAGES_ON_}${params.id}`, (data) => {
      console.log(data);
      setMessage("");
      setCurrentChannel({
        channel: currentChannel.channel,
        messages: groupByDate(data),
      });
      // scroll messages element to bottom
      const messagesEl = document.getElementById(params.id);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }, [params]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = (e) => {
    if (!message) return;

    socket.emit(ON_MESSAGE_SENT, {
      to: currentChannel?.channel,
      from: user,
      message,
      created_at: new Date(),
    });
  };

  return (
    <div className="channel">
      <div id={"room-" + params.id} className="chat-room">
        <div className="chat-room--header chat-room--container">
          <i className="fas fa-user-circle"></i>
          <h2>{user.displayName}</h2>
        </div>
        <div
          id={params.id}
          className="chat-room--messages chat-room--container"
        >
          {currentChannel && currentChannel.messages && (
            <>
              {Object.keys(currentChannel.messages).map((key) => (
                <Messages
                  key={key}
                  date={key}
                  messages={currentChannel.messages[key]}
                />
              ))}
            </>
          )}
        </div>
        <div className="chat-room--textarea-wrapper chat-room--container">
          <div className="chat-room--textarea">
            <textarea
              value={message}
              placeholder={`Send message to ${channelName}`}
              onChange={handleChange}
              onKeyPress={handleKeyDown}
            ></textarea>
            <button onClick={handleSubmit} className="send">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Messages = ({ date, messages }) => {
  return (
    <div className="messages">
      <h3>{formatDate(date)}</h3>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          from={message.from.displayName}
          body={message.message}
          created_at={message.created_at}
        />
      ))}
    </div>
  );
};

const MessageCard = ({ from, body, created_at }) => {
  return (
    <div className={`message-card ${from}`}>
      <div className="user blue">
        <i className="fas fa-user"></i>
      </div>
      <div>
        <div className="message-card--header">
          <Link onClick={(e) => e.preventDefault()} to={`/users/${from}`}>
            {from}
          </Link>
          <span className="date">{formatHour(created_at)}</span>
        </div>
        <p className="message-card--text">{body}</p>
      </div>
    </div>
  );
};

export default Channel;
