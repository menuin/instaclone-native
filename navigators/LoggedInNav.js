import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import { ScreenStackHeaderRightView } from "react-native-screens";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessageNav";



const Stack = createStackNavigator();

export default function LoggedInNav() {
    return (
        <Stack.Navigator screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
                name="Tabs"
                options={{ headerShown: false }}
                component={TabsNav}
            />
            <Stack.Screen
                name="Upload"
                options={{ headerShown: false }}
                component={UploadNav}
            />
            <Stack.Screen
                name="UploadForm"
                component={UploadForm}
                options={{
                    headerBackTitleVisible: false,
                    title: "Upload",
                    headerTintColor: "white",
                    headerStyle: {
                        backgroundColor: "black",
                    }
                }}
            />
            <Stack.Screen
                name="Messages"
                component={MessagesNav}
                options={{ headerMode: "none" }}
            />
        </Stack.Navigator>
    )
}