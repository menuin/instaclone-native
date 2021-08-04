import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
    flex:1;
    background-color: black;
    justify-content: center;
    align-items: center;
    padding:0px 40px;
`;
const Logo = styled.Image`
    max-width:50%;
    height:500px;
`;
const CreateAccount = styled.TouchableOpacity`
    background-color: ${colors.blue};
    padding :10px 10px;
    border-radius: 5px;
    width: 100%;
    opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;
const CreateAccountText = styled.Text`
    color : white;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
`;
const LoginLink = styled.Text`
    color : ${colors.blue};
    font-weight : 600;
    margin-top : 10px;
`;
export default function Welcome({ navigation }) {
    const goToCreateAccount = () => navigation.navigate("CreateAccount");
    const goToLogin = () => navigation.navigate("Login");

    return (
        <Container>
            <Logo resizeMode="contain" source={require("../assets/logo.png")} />
            <CreateAccount disabled={false} onPress={goToCreateAccount}>
                <CreateAccountText>Create New Account</CreateAccountText>
            </CreateAccount>
            <TouchableOpacity onPress={goToLogin}>
                <LoginLink>Log In</LoginLink>
            </TouchableOpacity>
        </Container>
    )
}