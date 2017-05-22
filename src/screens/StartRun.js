import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput
} from 'react-native';

var {height, width} = Dimensions.get('window');

import { Navigation } from 'react-native-navigation';
import { RunsItem, Button1 } from '../common';

export default class StartRun extends Component {
  static
    navigatorStyle = {
      navBarHidden: false,
      navBarBackgroundColor: '#EE4B26',
      navBarTextColor: 'white'
    };
  static
    navigatorButtons = {
      leftButtons: [
        {
          buttonColor: 'white',
          buttonFontSize: 14,
        }
      ]
    };

  startRunBtnPress() {
    this.props.navigator.push({
      screen: 'parcel.Runs',
      title: 'Runs'
    });
  }

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'reset') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.push({
          screen: 'parcel.CreateRun',
          title: 'Create Run'
        });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>

          <Button1
          text="START RUN"
          onPress={()=>this.startRunBtnPress()}
          width = {width/2}/>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  searchBoxContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(199, 199, 199, 0.84)',
    flexDirection: 'row',
    width: '100%'
  },
  searchBox: {
    width: '80%',
    paddingLeft: 10
  }

});
