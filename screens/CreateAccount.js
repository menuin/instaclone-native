import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";


export default function CreateAccount() {
    const { register, handleSubmit, setValue } = useForm();
    const lastNameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const onNext = (nextOne) => {
        nextOne?.current?.focus();
    };
    const onDone = () => {
        alert("done");
    }
    const onValid = (data) => {
        console.log(data);
    }
    useEffect(() => {
        register("firstName");
        register("lastName");
        register("username");
        register("email");
        register("password");
    }, [register])
    return (
        <AuthLayout>
            <TextInput
                autoFocus
                placeholder="First Name"
                returnKeyType="next"
                onSubmitEditing={() => onNext(lastNameRef)}
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                onChangeText={(text) => setValue("firstName", text)}
            />
            <TextInput
                ref={lastNameRef}
                placeholder="Last Name"
                returnKeyType="next"
                onSubmitEditing={() => onNext(usernameRef)}
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                onChangeText={(text) => setValue("lastName", text)}
            />
            <TextInput
                ref={usernameRef}
                placeholder="Username"
                returnKeyType="next"
                onSubmitEditing={() => onNext(emailRef)}
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                onChangeText={(text) => setValue("username", text)}
                autoCapitalize={"none"}
            />
            <TextInput
                ref={emailRef}
                placeholder="Email"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => onNext(passwordRef)}
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                onChangeText={(text) => setValue("email", text)}
            />
            <TextInput
                ref={passwordRef}
                placeholder="Password"
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={onDone}
                placeholderTextColor={"rgba(255,255,255,0.8)"}
                onChangeText={(text) => setValue("password", text)}
                lastOne={true}
            />
            <AuthButton text="Create Account" disabled={true} onPress={() => null} />
        </AuthLayout>
    )
}