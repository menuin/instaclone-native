import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";

const Input = styled.TextInput``;

const SEARCH_PHOTOS = gql`
    query searchPhotos($keyword:String!){
        searchPhotos(keyword:$keyword){
            id
            file
        }
    }
`

export default function Search({ navigation }) {
    const { setValue, register, watch } = useForm();
    const [startQueryFn, { loading, data }] = useLazyQuery(SEARCH_PHOTOS)
    const SearchBox = () => {
        return (
            <TextInput
                style={{ backgroundColor: "white" }}
                placeholderTextColor="black"
                placeholder="Search photos"
                autoCapitalize="none"
                returnKeyType="search"
                autoCorrect={false}
                onChangeText={(text) => setValue("keyword", text)} />
        )
    }
    useEffect(() => {
        navigation.setOptions({
            headerTitle: SearchBox,
        })
        register("keyword")
    }, []);
    console.log(watch());
    return (
        <DismissKeyboard>
            <View style={{
                backgroundColor: "black",
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
                    <Text style={{ color: "white" }}>Photo</Text>
                </TouchableOpacity>
            </View>
        </DismissKeyboard>
    )
}