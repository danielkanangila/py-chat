import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
    font-family: 'Pacifico', cursive;
    color: #fff;
    padding: 15px 15px;
`;

const Logo = () => {
    return <H1 className="logo">myChat</H1>
};


export default Logo;