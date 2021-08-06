import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login() {
    const { register, handleSubmit, setValue } = useForm()
    const passwordRef = useRef();
    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onValid = (data) => {
        console.log(data);
    };
    useEffect(() => {
        register("username", {
            required: true,
        });
        register("password", {
            required: true,
        });
    }, [register])
    return (
        <AuthLayout>
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                returnKeyType="next"
                autoCapitalize={"none"}
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={(text) => setValue("username", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                lastOne={true}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={(text) => setValue("password", text)}
            />
            <AuthButton
                text="Log In"
                disabled={false}
                onPress={handleSubmit(onValid)}
            />
        </AuthLayout>
    )
}