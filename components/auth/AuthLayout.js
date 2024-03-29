import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

const Container = styled.View`
    flex:1;
    background-color: black;
    justify-content: center;
    align-items: center;
    padding:0px 20px;
`;
const Logo = styled.Image`
    max-width:50%;
    width: 100%;
    height:300px;
    margin : 0 auto;
`;

export default function AuthLayout({ children }) {

    return (
        <DismissKeyboard>
            <Container>
                <KeyboardAvoidingView
                    style={{
                        width: "100%",
                    }}
                    behavior="position"
                    keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}>
                    <Logo resizeMode="contain" source={require("../../assets/logo.png")} />
                    {children}
                </KeyboardAvoidingView>
            </Container>
        </DismissKeyboard>
    )
}