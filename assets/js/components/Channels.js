import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { socket } from "./../libs"

const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/api/channels")
            .then(res => setChannels(res.data))
            .catch(error => console.log(error.response));
        socket.on("created_channel", channels => setChannels(channels));
        socket.on("channel_creation_error", error => setError(error.message));
    }, []);

    return (
        <div className="channels container">
            {error &&
                <div className="alert danger">
                    { error }
                </div>
            }
            <div className="c-header">
                <CreateChannel />
            </div>
            <div className="channels-list">
                <h2>Channels</h2>
                {channels.map(channel => <ChannelLink {...channel} key={channel.id}/>)}
            </div>
        </div>
    )
};

export const ChannelLink = ({id, name}) => {
    return <div className="channel">
        <Link to={`/channels/${id}`}>{name}</Link>
    </div>
};

const CreateChannel = () => {
    const [name, setName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit("create_channel", {name});
    };

    return (
        <form onSubmit={handleSubmit} className="create-channel">
            <div className="field">
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Dan Joe"
                    required
                />
                <label htmlFor="username">Channel name</label>
            </div>
            <button className="btn btn-primary">Create channel</button>
        </form>
    )
};

export default Channels;