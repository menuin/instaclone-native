import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import { Image, Text, View } from "react-native";
import Likes from "../screens/Likes";
import Comments from "../screens/Comments";

const Stack = createStackNavigator();
export default function StackNavFactory({ screenName }) {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitleVisible: false,
                headerMode: "screen",
                headerTintColor: "white",
                headerStyle: {
                    shadowColor: "rgba(255,255,255,0.3)",
                    backgroundColor: "black",
                },

            }}
        >
            {screenName === "Feed" ? (<Stack.Screen name="Feed" component={Feed} options={{
                headerTitle: () => {
                    return (
                        <Text style={{ color: "white", fontWeight: "600" }}>Instagram</Text>
                    )
                }
                // headerTitle: () => (

                //     <Image
                //         style={{ maxHeight: 50, }}
                //         resizeMode="contain"
                //         source={require("../assets/titlelogo.png")}
                //     />

                // ),
            }} />
            ) : null}
            {screenName === "Search" ? (<Stack.Screen name="Search" component={Search} />
            ) : null}
            {screenName === "Notifications" ? (<Stack.Screen name="Notifications" component={Notifications} />
            ) : null}
            {screenName === "Me" ? (<Stack.Screen name="Me" component={Me} />
            ) : null}
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Photo" component={Photo} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Comments" component={Comments} />
        </Stack.Navigator>
    )
}