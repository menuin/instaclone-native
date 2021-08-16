import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex : 1;
    background-color: black;
`;
const Actions = styled.View`
    flex:0.3;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
    width : 100px;
    height : 100px;
    background-color:rgba(255,255,255,0.5);
    border-radius: 50px;
    border:3px solid rgba(255,255,255,0.8);
`;

export default function TakePhoto() {
    const [ok, setOk] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const getPermissions = async () => {
        const { granted } = await Camera.requestPermissionsAsync();
        setOk(granted);
    }
    useEffect(() => {
        getPermissions();
    }, [])
    return (
        <Container>
            <Camera
                Type={cameraType}
                style={{ flex: 1 }}
            />
            <Actions>
                <TakePhotoBtn />
                <TouchableOpacity></TouchableOpacity>
            </Actions>
        </Container>
    )
}