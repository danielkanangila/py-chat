import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { socket } from "./../libs"

const Channels = () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        axios.get("/api/channels")
            .then(res => setChannels(res.data))
            .catch(error => console.log(error.response));
    }, []);

    return (
        <div className="channels container">
            <div className="c-header">
                <CreateChannel updateChannels={setChannels} />
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

const CreateChannel = ({updateChannels}) => {
    const [name, setName] = useState("");
    const [error, setError]= useState(null);
    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/api/channels", { name })
            .then(res => {
                setError(null);
                updateChannels(res.data)
            })
            .catch(error => {
                console.log(error.response.data);
                setError(error.response.data.message)
            });
    };

    return (
        <form onSubmit={handleSubmit} className="create-channel">
            <div className="field">
                {error &&
                    <div className="alert danger">
                        {error}
                    </div>
                }
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