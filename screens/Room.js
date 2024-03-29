
import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect } from "react";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { FlatList, KeyboardAvoidingView, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";
import useMe from "../hooks/useMe";

const SEND_MESSAGE_MUTATION = gql`
    mutation sendMessage($payload:String! $roomId:Int $userId:Int){
        sendMessage(payload:$payload, roomId:$roomId, userId:$userId){
            ok
            id
        }
    }
`;

const ROOM_QUERY = gql`
    query seeRoom($id:Int!){
        seeRoom(id:$id){
            id
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
    color:white;
    font-size:16px;
`;



export default function Room({ route, navigation }) {
    const { data: meData } = useMe();
    const { register, setValue, handleSubmit, getValues, watch } = useForm();
    const updateSendMessage = (cache, result) => {
        const { data: { sendMessage: { ok, id } } } = result;

        if (ok && meData) {
            const { message } = getValues();
            setValue("message", "");
            const messageObj = {
                id,
                payload: message,
                user: {
                    username: meData.me.username,
                    avatar: meData.me.avatar,
                },
                read: true,
                __typename: "Message",
            };

            const messageFragment = cache.writeFragment({
                fragment: gql`
                    fragment NewMessage on Message {
                        id
                        payload
                        user {
                            username
                            avatar
                        }
                        read
                    }
                `,
                data: messageObj,
            });

            cache.modify({
                id: `Room:${route.params.id}`,
                fields: {
                    messages(prev) {
                        return [...prev, messageFragment]
                    }
                }
            })
        }
    }
    const [sendMessageMutation, { loading: sendingMessage }] = useMutation(SEND_MESSAGE_MUTATION, {
        update: updateSendMessage,
    })

    const { data, loading, refetch } = useQuery(ROOM_QUERY, {
        variables: {
            id: route?.params?.id,
        }
    });
    const onValid = ({ message }) => {
        if (!sendingMessage) {
            sendMessageMutation({
                variables: {
                    payload: message,
                    roomId: route?.params?.id,
                }
            })
        }
    }
    useEffect(() => {
        register("message", { required: true })
    }, [register]);

    useEffect(() => {
        navigation.setOptions({
            title: `${route?.params?.talkingTo?.username}`,
        });
        refetch();
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
                    style={{ width: "100%", paddingVertical: 10 }}
                    ItemSeparatorComponent={() => <View style={{ height: 4 }}></View>}
                    data={data?.seeRoom?.messages}
                    keyExtractor={message => "" + message.id}
                    renderItem={renderItem}
                />
                <MessageInput
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    placeholder="Write a message..."
                    returnKeyLabel="Send Message"
                    returnKeyType="send"
                    onChangeText={(text) => setValue("message", text)}
                    onSubmitEditing={handleSubmit(onValid)}
                    value={watch("message")}
                />
            </ScreenLayout>
        </KeyboardAvoidingView>
    )
}