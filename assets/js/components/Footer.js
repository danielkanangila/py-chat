import React from 'react';
import styled from 'styled-components';
import {Container} from './styled-components';
import {useLocalStorage} from "../hooks";

const Footer = () => {
    const [user, setUser] = useLocalStorage("user", null);

    if (user) {
        return (
            <Wrapper>
                <Container>

                    <p>CS50's Web Programming with Python and JavaScript - 2020</p>
                    <p>Project2 - Chat App</p>
                    <p>By Kabandangi Kanangila</p>
                    <a href="https://github.com/danielkanangila/py-chat">
                        <i className="fab fa-github-square"></i>
                        Project Repository
                    </a>
                </Container>
            </Wrapper>
        )
    } else {
        return <></>
    }
};

const Wrapper = styled.footer`
    ${props => props.show ? `display: block;` : 'display: none;'}
    width: 100%;
    background-color: #212121;
    color: #fff;
    padding: 50px 0;
    text-align: center;
    p {
        line-height: 1.5;
        &:first-child {
            font-size: 1.4rem
        }
    }
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-top: 8px;
        i {
            font-size: 2rem;
            margin-right: 10px;
        }
    }
`;

export default Footer;