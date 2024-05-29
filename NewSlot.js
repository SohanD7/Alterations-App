import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import db from "../config";
import CalendarPicker from 'react-native-calendar-picker';


export default class NewSlot extends Component {
  constructor()
  {
    super();
    this.state= {
      date: null,
      timeBegins: 0,
      timeEnds: 0
    }
    this.onDateChange = this.onDateChange.bind(this);
  }

    onDateChange(dateIn){
    this.setState({
      date: dateIn
    })
  }


  createNewSlot(date1,timeBegins,timeEnds)
  {
    var d1 = date1.toString()
    db.collection("host").add({ 
      available: true,
      date: d1,
      endTime: timeEnds,
      startTime: timeBegins
    })
    alert("Slot added");
    this.setState({
      date: null,
      timeBegins: 0,
      timeEnds: 0
    })
  }

  render() {
    const {date, timeBegins, timeEnds} = this.state
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.android}/>
        <View style={styles.appTitleTextContainer}>
          <Text style={styles.appTitleText}>
            Enter a new time slot
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <ScrollView>
            <CalendarPicker
              onDateChange = {this.onDateChange}
            />
            <TextInput 
              style={styles.inputFont}
              onChangeText = {(timeBegins)=>this.setState({timeBegins: timeBegins})}
              placeholder={"Time Begins"}
              placeholderTextColor={"purple"}
            />
            <TextInput 
              style={styles.inputFont}
              onChangeText = {(timeEnds)=>this.setState({timeEnds: timeEnds})}
              placeholder={"Time Ends"}
              placeholderTextColor={"purple"} 
            />
          </ScrollView>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={()=>{this.createNewSlot(date, timeBegins, timeEnds)}}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "lavender"
  },
  android: {
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight: 0 //this will ensure that the screen gets 
  },                                                                 //accomodated for android
  appTitleTextContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitleText: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    color: "purple"
  },
  inputsContainer: {
    flex: 0.9
  },
  inputFont: {
    height: RFValue(60),
    marginTop: RFValue(70),
    borderColor: "purple",
    color: "purple",
    borderWidth: RFValue(4),
    borderRadius: RFValue(20),
    textAlign: "center",
    fontSize: RFValue(28),
    width: "80%",
    alignSelf: "center",
    backgroundColor: "lavenderblush"
  },
  button: {
    alignSelf: "center",
    marginTop: RFValue(5),
    borderWidth: RFValue(5),
    width: RFValue(130),
    height: RFValue(50),
    borderColor: "plum",
    backgroundColor: "purple",
    borderRadius: RFValue(20)
  },
  buttonText: {
    textAlign: "center",
    fontSize: RFValue(28),
    fontWeight: "bold",
    color: "plum"
  }
});