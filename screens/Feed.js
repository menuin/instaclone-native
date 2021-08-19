import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Photo from "../components/Photo";
import ScreenLayout from "../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

const FEED_QUERY = gql`
  query seeFeed($offset:Int!) {
    seeFeed (offset:$offset){
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

export default function Feed({ navigation }) {
  const [offset, setOffset] = useState(0);
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    }
  });
  const renderPhoto = ({ item: photo }) => {
    return (
      <Photo {...photo} />
    )
  }
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }
  const [refreshing, setRefreshing] = useState(false);

  const MessagesBtn = () => {
    return (
      <TouchableOpacity style={{ marginRight: 15 }} onPress={() => navigation.navigate("Messages")}>
        <Ionicons name="paper-plane" color="white" size={20} />
      </TouchableOpacity>)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesBtn,

    })
  }, [])


  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() => fetchMore({
          variables: {
            offset: data?.seeFeed?.length
          }
        })}
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={photo => "" + photo.id}
        renderItem={renderPhoto}
      />
    </ScreenLayout>
  )
}