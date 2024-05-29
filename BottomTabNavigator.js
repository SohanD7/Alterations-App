import React, {Component} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import {RFValue} from "react-native-responsive-fontsize";
import HomeScreen from "../Screens/HomeScreen";
import NewSlot from "../Screens/NewSlot";

const Tab = createBottomTabNavigator(); 
const BottomTabNavigator=()=>
{
    return(
      <Tab.Navigator
        screenOptions={({route})=>({
          tabBarIcon: ({focused,color,size})=>{ //displays the tab icon
              let iconName
              if(route.name == "Home")
              {
                iconName = focused ? "home": "home-outline";
              }
              else if(route.name == "New Slot")
              {
                iconName = focused ? "add-circle": "add-circle-outline";
              }
              return(
                <Ionicons 
                  name={iconName}
                  size = {RFValue(33)} //RFValue makes sure the ratio of the disply is accomodated to the device
                  color= {color}
                />
              )
          }
        })} //styling for the tab bar
        tabBarOptions = {{ 
          activeTintColor:"purple",
          inactiveTintColor: "white",
          style: {
            height: 150,
            backgroundColor: "#5653D4",
            paddingBottom: 20
          },
          labelStyle: {fontSize: 15, fontWeight: "bold"}, 
          tabStyle: {
            backgroundColor: "plum",
            alignItems: "center",
            justifyContents: "center",
            height: RFValue(60),
            paddingBottom: 2
          }
        }}
      >
        <Tab.Screen name="New Slot" component={NewSlot} options={{headerShown: false}}/>
        <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/> 
      </Tab.Navigator>
    );
}

export default BottomTabNavigator