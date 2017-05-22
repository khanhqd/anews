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

export default class CreateRun extends Component {
  static
    navigatorStyle = {
      navBarHidden: false,
      navBarBackgroundColor: '#EE4B26',
      navBarTextColor: 'white'
    };
  static
    navigatorButtons = {
      rightButtons: [
        {
          title: 'Reset', // for a textual button, provide the button title (label)
          id: 'reset', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
          disabled: false, // optional, used to disable the button (appears faded and doesn't interact)
          disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
          buttonColor: 'white', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
          buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
          buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
        }
      ],
      leftButtons: [
        {
          buttonColor: 'white',
          buttonFontSize: 14,
        }
      ]
    };

  startRunBtnPress() {
    this.props.navigator.push({
      screen: 'parcel.StartRun',
      title: 'Run'
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
