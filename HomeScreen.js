import React, {Component} from 'react';
import { View, StyleSheet,Text, SafeAreaView, Platform, StatusBar } from 'react-native';


export default class HomeScreen extends Component
{
  render()
  {
    return(
      <View>
      <SafeAreaView style={styles.android}/>
      <Text>Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  android: {
      marginTop: Platform.OS == "android" ? StatusBar.currentHeight: 0 
  }
});