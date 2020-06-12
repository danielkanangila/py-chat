import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import  axios from "axios";
import { ChannelLink } from "./Channels";
import { useLocalStorage } from "./../hooks";

const Channel = () => {
    const [channels, setChannels] = useState([]);
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
            <div className="side-nav">
                <div className="profil">
                    <i className="fas fa-user-circle"></i>
                    <h1 className="title">{user.displayName}</h1>
                </div>
                <div className="channel-list">
                    {channels.map(channel => <ChannelLink {...channel} key={channel.id} />)}
                </div>
            </div>
            <div className="messages">
                <div className="message-header">
                    <h1 className="title">{currentChannel?.name}</h1>
                </div>
                <div className="message-list">
                    {currentChannel?.messages.map(message => <MessageCard {...message} />)}
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
                <Link to={`/users/${from}`}>{from}</Link>
                <span className="data">{created_at}</span>
            </div>
            <p className="message-card--text">{body}</p>
        </div>
    )
};

export default Channel;