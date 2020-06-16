import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import  axios from "axios";
import { ChannelLink } from "./Channels";
import { useLocalStorage } from "./../hooks";

const Channel = () => {
    const [currentChannel, setCurrentChannel] = useLocalStorage("channel");
    const [user, setUser] = useLocalStorage("user" );
    const params = useParams();

    useEffect(() => {
            axios.get(`/api/channels`)
                .then(res => setChannels(res.data))
                .catch(error => console.log(error.response));

            axios.get(`/api/channels/${params.id}`)
                .then(res => setCurrentChannel(res.data))
                .catch(error => console.log(error.response));
    }, [ params ]);

    return(
        <div className="channel">
            <div id={ 'room-' + params.id} className="chat-room">
                <div className="chat-room--header chat-room--container">
                    <i className="fas fa-user-circle"></i>
                    <h2>{user.displayName}</h2>
                </div>
                <div className="chat-room--messages chat-room--container">

                </div>
                <div className="chat-room--textarea-wrapper chat-room--container">
                    <div className="chat-room--textarea">
                        <textarea placeholder={`Send message to ${currentChannel?.name}`}></textarea>
                        <button className="send">
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

const MessageCard = ({from, body, created_at}) => {
    return(
        <div className="message-card">
            <div className="message-card--header">
                <i className="fas fa-user-circle"></i>
                <Link onClick={e => e.preventDefault()} to={`/users/${from}`}>{from}</Link>
                <span className="data">{created_at}</span>

            </div>
            <p className="message-card--text">{body}</p>
        </div>
    )
};

export default Channel;