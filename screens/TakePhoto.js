import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Slider from '@react-native-community/slider';
import * as MediaLibrary from 'expo-media-library';

const Container = styled.View`
    flex : 1;
    background-color: black;
`;
const Actions = styled.View`
    flex:0.3;
    padding : 0px 50px;
    align-items: center;
    justify-content: space-around;
`;
const ButtonsContainer = styled.View`
    width:100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const TakePhotoBtn = styled.TouchableOpacity`
    width : 100px;
    height : 100px;
    background-color:rgba(255,255,255,0.5);
    border-radius: 50px;
    border:3px solid rgba(255,255,255,0.8);
`;
const SliderContainer = styled.View``;
const ActionsContainer = styled.View`
    flex-direction: row;
`;
const CloseBtn = styled.TouchableOpacity`
    position : absolute;
    top : 20px;
    left:20px;
`;
const PhotoActions = styled(Actions)`
    flex-direction: row;
`;
const PhotoAction = styled.TouchableOpacity`
    background-color: white;
    padding : 5px 10px;
    border-radius : 4px;
`;
const PhotoActionText = styled.Text`
    font-weight : 600;
`;


export default function TakePhoto({ navigation }) {
    const camera = useRef();
    const [takenPhoto, setTakenPhoto] = useState("");
    const [cameraReady, setCameraReady] = useState(false);
    const [ok, setOk] = useState(false);
    const [zoom, setZoom] = useState(0);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
    const getPermissions = async () => {
        const { granted } = await Camera.requestPermissionsAsync();
        setOk(granted);
    }
    useEffect(() => {
        getPermissions();
    }, [])

    const onCameraSwitch = () => {
        if (cameraType === Camera.Constants.Type.front) {
            setCameraType(Camera.Constants.Type.back);
        } else {
            setCameraType(Camera.Constants.Type.front);
        }
    }
    const onZoomValueChange = (e) => {
        setZoom(e);
    }
    const onFlashChange = () => {
        if (flashMode === Camera.Constants.FlashMode.off) {
            setFlashMode(Camera.Constants.FlashMode.on)
        } else if (flashMode === Camera.Constants.FlashMode.on) {
            setFlashMode(Camera.Constants.FlashMode.auto)
        } else if (flashMode === Camera.Constants.FlashMode.auto) {
            setFlashMode(Camera.Constants.FlashMode.off)
        }
    }
    const onCameraReady = () => setCameraReady(true);
    const takePhoto = async () => {
        if (camera.current && cameraReady) {
            const { uri } = await camera.current.takePictureAsync({
                quality: 1,
                exif: true,
            });
            setTakenPhoto(uri);
        }
    }
    const onDismiss = () => setTakenPhoto("");
    const goToUpload = async (save) => {
        if (save) {
            await MediaLibrary.saveToLibraryAsync(takenPhoto);
        }
        // go to upload screen
    }
    const onUpload = () => {
        Alert.alert("Alert", "Do you want to save before uploading?", [
            {
                text: "Yes",
                onPress: () => goToUpload(true),
            }, {
                text: "No, thanks",
                style: "destructive",
                onPress: () => goToUpload(false),
            }]);
    }


    return (
        <Container>
            <StatusBar hidden={true} />
            {takenPhoto === "" ? <Camera
                type={cameraType}
                style={{ flex: 1 }}
                zoom={zoom}
                flashMode={flashMode}
                ref={camera}
                onCameraReady={onCameraReady}
            >
                <CloseBtn onPress={() => navigation.navigate("Tabs")}>
                    <Ionicons name="close" color="white" size={30} />
                </CloseBtn>
            </Camera> : <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />}

            {takenPhoto === "" ? (
                <Actions>
                    <SliderContainer>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="rgba(255,255,255,0.5)"
                            onValueChange={onZoomValueChange}
                        />
                    </SliderContainer>
                    <ButtonsContainer>
                        <TakePhotoBtn onPress={takePhoto} />
                        <ActionsContainer>
                            <TouchableOpacity onPress={onFlashChange} style={{ marginRight: 30 }}>
                                <Ionicons
                                    size={38}
                                    color="white"
                                    name={
                                        flashMode === Camera.Constants.FlashMode.off
                                            ? "flash-off"
                                            : flashMode === Camera.Constants.FlashMode.on
                                                ? "flash"
                                                : flashMode === Camera.Constants.FlashMode.auto
                                                    ? "eye"
                                                    : ""
                                    }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onCameraSwitch}>
                                <Ionicons
                                    color="white"
                                    size={38}
                                    name={cameraType === Camera.Constants.Type.front
                                        ? "camera-reverse"
                                        : "camera"} />
                            </TouchableOpacity>
                        </ActionsContainer>
                    </ButtonsContainer>
                </Actions>)
                : (
                    <PhotoActions>
                        <PhotoAction onPress={onDismiss}>
                            <PhotoActionText>Dismiss</PhotoActionText>
                        </PhotoAction>
                        <PhotoAction onPress={onUpload}>
                            <PhotoActionText>Upload</PhotoActionText>
                        </PhotoAction>
                    </PhotoActions>)}
        </Container>
    )
}