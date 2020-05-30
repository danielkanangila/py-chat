import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Channels = () => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        axios.get("/api/channels")
            .then(res => setChannels(res.data))
            .catch(error => console.log(error.response));
    }, []);

    return (
        <div className="channels">
            <div className="c-header">
                <CreateChannel />
            </div>
            <div className="channels-list">
                {channels.map(channel => <ChannelLink {...channel} key={channel.id}/>)}
            </div>
        </div>
    )
};

export const ChannelLink = ({name}) => {
    return <div className="channel">
        <Link to={`/channels/${name}`}>{name}</Link>
    </div>
};

const CreateChannel = () => {
    const [name, setName] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/channels", { name })
            .then(res => console.log(`Channel ${name} created`))
            .catch(error => console.log(error.response));
    };

    return (
        <form onSubmit={handleSubmit} className="create-channel">
            <input
                type="text"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button className="btn btn-primary">Create channel</button>
        </form>
    )
};

export default Channels;