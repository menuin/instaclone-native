import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "black"
                },
                tabBarActiveTintColor: "white",
                tabBarIndicatorStyle: {
                    backgroundColor: "white",
                }
            }}
        >
            <Tab.Screen name="SelectTab" title="Select">
                {() => (
                    <Stack.Navigator
                        screenOptions={{
                            headerTintColor: "white",
                            headerBackTitleVisible: false,
                            headerBackImage: ({ tintColor }) => (
                                <Ionicons color={tintColor} name="close" size={28} />
                            ),
                            headerStyle: {
                                backgroundColor: "black",
                                borderBottomColor: "#737373"
                            }
                        }}>
                        <Stack.Screen name="Select" options={{ title: "Choose a photo" }} component={SelectPhoto} />
                    </Stack.Navigator>
                )
                }
            </Tab.Screen>
            <Tab.Screen name="Take" component={TakePhoto} />
        </Tab.Navigator>
    )
}