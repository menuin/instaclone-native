import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PHOTO_FRAGMENT } from "../fragments";
import Photo from "../components/Photo"
import ScreenLayout from "../components/ScreenLayout";

const SEE_PHOTO = gql`
    query seePhoto($id:Int!){
        seePhoto(id:$id){
            ...PhotoFragment
            user {
                id
                username
                avatar
            }
            caption
        }
    }
    ${PHOTO_FRAGMENT}
`

export default function PhotoScreen({ route }) {
    const { data, loading, error, refetch } = useQuery(SEE_PHOTO, {
        variables: {
            id: route?.params?.photoId,
        },
    });
    const [refreshing, setRefreshing] = useState();
    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }
    return (
        <ScreenLayout loading={loading}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={onRefresh}
                        refreshing={refreshing}
                    />
                }
                style={{ backgroundColor: "black" }}
                contentContainerStyle={{
                    backgroundColor: "black",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <Photo {...data?.seePhoto} />
            </ScrollView>
        </ScreenLayout>
    )
}