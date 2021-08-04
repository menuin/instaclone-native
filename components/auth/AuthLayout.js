import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex:1;
    background-color: black;
    justify-content: center;
    align-items: center;
    padding:0px 40px;
`;
const Logo = styled.Image`
    max-width:50%;
    width: 100%;
    height:300px;
`;

export default function AuthLayout({ children }) {
    return (
        <Container>
            <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
            {children}
        </Container>
    )
}