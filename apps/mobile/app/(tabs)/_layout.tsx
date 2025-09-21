import React from "react";
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0a0a0a",
          borderTopColor: "#262626",
          borderTopWidth: 2,
          height: 60,
        },
        tabBarItemStyle: {
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  source={require("../../assets/icons/home.png")}
                  tintColor={focused ? "#00acdf" : "grey"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="generate"
        options={{
          title: "Generate",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  source={require("../../assets/icons/generate.png")}
                  tintColor={focused ? "#00acdf" : "grey"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="public"
        options={{
          title: "All Thumbnails",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  source={require("../../assets/icons/public.png")}
                  tintColor={focused ? "#00acdf" : "grey"}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Image
                  source={require("../../assets/icons/account.png")}
                  tintColor={focused ? "#00acdf" : "grey"}
                />
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;
