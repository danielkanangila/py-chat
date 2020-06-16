import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useLocalStorage} from "../hooks";
import axios from "axios";

const closeSideNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const SideNav = () => {
    const [user, setUser] = useLocalStorage("user", null);
    const [channels, setChannels] = useState([]);

    useEffect(() =>{
        axios.get("/api/channels")
            .then(res => setChannels(res.data))
            .catch(error => console.log(error.response || error));
    }, []);

    return(
        <Wrapper id="mySidenav" className="sidenav">
            <div className="profile">
                <i className="fas fa-user-circle"></i>
                <h2>{user.displayName}</h2>
            </div>
            <span onClick={closeSideNav} className="closebtn">&times;</span>
            <div className="sidenav-channels">
                {channels.map(channel => <SideNavLink key={channel.id} to={`/channels/${channel.id}`}>{channel.name}</SideNavLink>)}
            </div>

        </Wrapper>
    );
};

const SideNavLink = ({to, children}) => {
    return <Link className="sidenav-link" onClick={closeSideNav} to={to}>
        <i className="fab fa-intercom"></i>
        <span>{children}</span>
    </Link>
};

const Wrapper = styled.div`
    height: 100%;
    width: 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #212121;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    -webkit-box-shadow: 10px 0px 5px -1px rgba(0,0,0,0.26);
    -moz-box-shadow: 10px 0px 5px -1px rgba(0,0,0,0.26);
    box-shadow: 10px 0px 5px -1px rgba(0,0,0,0.26);

    a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 1.125rem;
        color: #ffffff;
        display: block;
        transition: ease-in 0.3s;
        &:hover {
            background-color: #424242;
        }
    }
    .closebtn {
        position: absolute;
        top: 0;
        left: 0;
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #ffffff;
        font-size: 36px;
        cursor: pointer;
    }
    .clearfix {
        margin-bottom: 30px;
    }
`

export default SideNav;