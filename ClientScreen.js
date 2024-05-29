import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import firebase from "firebase"

export default class ClientScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      allSlots: [],
    };
  }

  componentDidMount(){ //runs as soon as the code compiles
    this.getSlots()
  };

  getSlots = () => {
    db.collection("host").get().then((doc)=>{
      doc.docs.map((x)=>{
        this.setState({ allSlots: [...this.state.allSlots, x.data()] });
      })
    })

  };

  handleSlot = async (text) => {
   
    
    this.setState({
      allSlots: []
    });

    if (!text) {
      this.getSlots();
    }

  
      firebase.database.collection("host")
        .where("slotNo", "==", text)
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            this.setState({
              allSlots: [...this.state.allTransactions, doc.data()],
            
            });
          });
        });
  };

  renderItem = ({ item, i }) => {
    console.log("a")
    var date = item.date.toString().slice(0,10);
    var slotType = item.available == true ? 'available' : 'not available';
    console.log(item.available)
    return (
      <View style={{ borderWidth: 2, borderColor: 'purple' }}>
        <ListItem key={i} bottomDivider>
          <Icon type={'antdesign'} name={'time-slot'} size={50} />
          <ListItem.Content>
           <ListItem.Title style={styles.title}>
            {`${date}`}
          </ListItem.Title> 
            <ListItem.Subtitle style={styles.subtitle}>
            {`Start time - ${item.startTime} and End time - ${item.endTime}`}
            </ListItem.Subtitle>
            <View style={styles.lowerLeftContaiiner}>
              <View style={styles.slotContainer}>
                <Text
                  style={[
                    styles.transactionText,
                    {
                      color:
                        item.available === true
                          ? 'red'
                          : '#0364F4',
                    },
                    {padding: 20}
                  ]}>
                  {slotType.charAt(0).toUpperCase() +
                    slotType.slice(1)}
                </Text>
                <Icon
                  type={'ionicon'}
                  name={
                    item.available === true
                      ? 'checkmark-circle-outline'
                      : 'arrow-redo-circle-outline'
                  }
                  color={
                    item.available === true ? '#78D304' : '#0364F4'
                  }
                />
              </View>
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    );
  };

  render() {
    const { searchText, allSlots } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <FlatList renderItem={this.renderItem} data={this.state.allSlots} keyExtractor={this.keyExtractor}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: RFValue(35),
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: RFValue(20),
    marginBottom: RFValue(30),
  },
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
  },
  lowerLeftContaiiner: {
    alignSelf: "flex-end",
    marginTop: -10
  },
  slotContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  transactionText: {
    fontSize: 20
  },
  date: {
    fontSize: 12,
    paddingTop: 5
  }

});
