import styled from "styled-components"

export const Container = styled.div`
    padding: 0 1.5rem;
    @media (min-width: 750px) {
        padding: 0 3.5rem;
    }
`;

const CustomButton = () => {
    return `
        padding: 15px;
        font-size: 0.9rem;
        text-transform: uppercase;
        background-color: #212121;
        color: #fff;
        border-radius: 25px;
        margin: 15px 0;
        transition: .3s;
        cursor: pointer;
        &:hover {
            background-color: #000;
        }
    `
};

export const Button = styled.button`
    ${CustomButton()}
    margin: 0;
    background-color: ${props => props.__type === 'primary' ? '#fff' : '#512da8'};
    border: ${props => props.__type === 'primary' ? '1px solid #512da8' : 'none'};
    color: ${props => props.__type === 'primary' ? '#212121' : '#fff'};
    &:hover {
        background-color: ${props => props.__type === 'primary' ? '#512da8' : '#311b92'};
        color: ${props => props.__type === 'primary' ? '#fff' : '#fff'};
    }
`;

