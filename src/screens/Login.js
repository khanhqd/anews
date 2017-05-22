import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

var {height, width} = Dimensions.get('window');

import { Navigation } from 'react-native-navigation';
import { LoginInput, Button1 } from '../common';

export default class Login extends Component {
  static navigatorStyle = {
    navBarHidden: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  loginBtnPress() {
    this.props.navigator.push({
      screen: 'parcel.Home',
      title: 'Trang chủ'
    });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
          style={styles.background}
          source={require('../../img/login_background.png')}/>

          <Image
          style={{width: 100, height: 100, marginTop: 100}}
          source={require('../../img/Logo-NEU.png')}/>

          <View style={{ position:'absolute', bottom: 70 }}>
              <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
                  <LoginInput
                  icon={require("../../img/ic_user.png")}
                  placeholder="Email"/>
                  <LoginInput
                  icon={require("../../img/ic_lock.png")}
                  secureTextEntry={true}
                  placeholder="Password"/>
              </KeyboardAvoidingView>
              <View style={styles.button}>
                  <Button1
                  text="Sign in"
                  onPress={()=>this.loginBtnPress()}
                  width = {width}/>
              </View>
          </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    alignItems: 'center'
  },
  button: {
    marginTop: 70,
    alignItems: 'center'
  },
  forgetPasswordButton:{
    marginTop: 20,
    alignItems: 'center'
  },
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  }

});
