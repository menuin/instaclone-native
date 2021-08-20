
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { FlatList, KeyboardAvoidingView, TextInput } from "react-native";

const SEND_MESSAGE = gql`
    mutation sendMessage($payload:String! $roomId:Int $userId:Int){
        sendMessage(payload:$paylod, roomId:$roomId, userId:$userId){
            ok
            id
        }
    }
`;

const ROOM_QUERY = gql`
    query seeRoom($id:Int!){
        seeRoom(id:$id){
            messages {
                id
                payload
                user {
                    username
                    avatar
                }
                read
            }
        }
    }
`;

const MessageContainer = styled.View`
    padding : 10px 0px;
    flex-direction: ${props => props.outgoing ? "row-reverse" : "row"};
    align-items: flex-end;
`;
const Author = styled.View`
    margin : 0px 10px;
`;
const Avatar = styled.Image`
    height : 30px; 
    width:30px;
    border-radius:25px;
    border-color:white;
`;
const Message = styled.Text`
    color:white;
    background-color: rgba(255,255,255,0.4);
    padding : 5px 10px;
    border-radius : 10px;
    overflow:hidden;
`;
const MessageInput = styled.TextInput`
    margin-bottom : 50px; 
    margin-top:25px; 
    width:95%;
    border:1px solid rgba(255,255,255,0.5);
    padding : 10px 20px;
    border-radius:1000px;
    font-size:16px;
`;



export default function Room({ route, navigation }) {
    const { data, loading } = useQuery(ROOM_QUERY, {
        variables: {
            id: route?.params?.id,
        }
    })
    useEffect(() => {
        navigation.setOptions({
            title: `${route?.params?.talkingTo?.username}`,
        })
    }, []);

    const renderItem = ({ item: message }) => (
        <MessageContainer outgoing={message.user.username !== route?.params?.talkingTo?.username}>
            <Author>
                <Avatar source={{ uri: message.user.avatar }} />
            </Author>
            <Message>{message.payload}</Message>
        </MessageContainer>
    );


    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "black" }} behavior="padding" keyboardVerticalOffset={160}>
            <ScreenLayout loading={loading}>
                <FlatList
                    inverted
                    style={{ width: "100%" }}
                    data={data?.seeRoom?.messages}
                    keyExtractor={message => "" + message.id}
                    renderItem={renderItem}
                />
                <MessageInput
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    placeholder="Write a message..."
                    returnKeyLabel="Send Message"
                    returnKeyType="send"
                />
            </ScreenLayout>
        </KeyboardAvoidingView>
    )
}