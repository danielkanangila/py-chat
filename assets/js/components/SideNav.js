import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const closeSideNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

const SideNav = () => {
    return(
        <Wrapper id="mySidenav" className="sidenav">
            <span onClick={closeSideNav} className="closebtn">&times;</span>
            {/* <div className="clearfix"></div> */}
            <SideNavLink to="/buddles">Home</SideNavLink>
        </Wrapper>
    );
};

const SideNavLink = ({to, children}) => {
    return <Link onClick={closeSideNav} to={to}>{children}</Link>
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
    z-index: 1000;
    -webkit-box-shadow: 10px 0px 5px -1px rgba(0,0,0,0.26);
    -moz-box-shadow: 10px 0px 5px -1px rgba(0,0,0,0.26);
    box-shadow: 10px 0px 5px -1px rgba(0,0,0,0.26);

    a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 25px;
        color: #ffffff;
        display: block;
        transition: ease-in 0.3s;
        &:hover {
            background-color: #ffffff;
            color: #212121;
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