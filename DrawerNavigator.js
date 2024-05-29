import React, {Component} from 'react';
import { View, StyleSheet,Text } from 'react-native';
import {createDrawerNavigator} from "@react-navigation/drawer"
import ClientScreen from "../Screens/ClientScreen";
import StackNavigator from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator=()=>
{
  return(
    <Drawer.Navigator>
      <Drawer.Screen name="Stack" component={StackNavigator}/>
      <Drawer.Screen name="Home" component={ClientScreen}/>
    </Drawer.Navigator>
  );
}


export default DrawerNavigator;