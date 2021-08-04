import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login({ navigation }) {
    return (
        <AuthLayout>
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                returnKeyType="next"
                placeholderTextColor={"rgba(255,255,255,0.8)"}
            />
            <TextInput
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                lastOne={true}
            />
        </AuthLayout>
    )
}