import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {Navigation} from 'react-native-navigation';
var {height, width} = Dimensions.get('window');
import { Button1 } from '../common';

export default class Home extends Component {
  static navigatorButtons = {
    leftButtons: [{
      icon: require('../../img/navicon_menu.png'),
      id: 'menu'
    }]
  };
  static navigatorStyle = {
    navBarButtonColor: 'white',
    navBarHidden: true,
    navBarBackgroundColor: '#889C9B',
    navBarTextColor: 'white',
    orientation: 'portrait'
  };

  onNavigatorEvent(event) {
    if (event.id === 'menu') {
      // this.props.navigator.toggleDrawer({
      //   side: 'left',
      //   animated: true
      // });
    }
    if (event.id === 'shop') {
      Alert.alert('NavBar', 'Edit button pressed');
    }
    if (event.id === 'add') {
      Alert.alert('NavBar', 'Add button pressed');
    }
  }
  // renderRow(data) {
  //   return(
  //     <TouchableOpacity style={{flexDirection:'row',justifyContent:'center'}}>
  //       <View style={[{flex:4,flexDirection:'row'},styles.firstRow]}>
  //         <View style={{flex:1}}>
  //           <Image
  //             style={styles.imageMenu}
  //             source={data.imgUrl}/>
  //         </View>
  //         <View style={{flex:2}}>
  //           <Text style={styles.tenBanh}>{data.tenBanh}</Text>
  //           <Text style={styles.textNormal}>{data.thanhPhan}</Text>
  //         </View>
  //       </View>
  //       <View style={[{flex:1},styles.firstRow]}>
  //         <Text style={styles.tenBanh}>{data.gia}</Text>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }
  render() {
    return (
      <View style={{flex:1}}>
        <Image
        style={styles.background}
        source={require('../../img/login_background.png')}/>
        <ScrollView >
          <View style={styles.rowContainer}>
            <TouchableOpacity onPress={()=> this.props.navigator.push({ screen: "parcel.News", title: 'Tin tức' })}>
                <View style={styles.itemContainer}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_news.png')}/>
                    <Text style={styles.title}>
                        Tin mới
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.itemContainer,{marginLeft: 0}]}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_list.png')}/>
                    <Text style={styles.title}>
                        Văn hóa - xã hội
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity>
                <View style={styles.itemContainer}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_medal.png')}/>
                    <Text style={styles.title}>
                        Thể thao
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.itemContainer,{marginLeft: 0}]}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_schedule.png')}/>
                    <Text style={styles.title}>
                        Điện ảnh
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
          <View style={styles.rowContainer}>
            <TouchableOpacity>
                <View style={styles.itemContainer}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_sign.png')}/>
                    <Text style={styles.title}>
                        Thời trang
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={[styles.itemContainer,{marginLeft: 0}]}>
                    <Image
                    style={styles.icon}
                    source={require('../../img/ic_profile.png')}/>
                    <Text style={styles.title}>
                        Tài khoản
                    </Text>
                </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
              <View style={[styles.itemContainer,{height: 100, width: width - 10}]}>
                  <Image
                  style={styles.icon}
                  source={require('../../img/ic_logout.png')}/>
                  <Text style={styles.title}>
                      Đăng xuất
                  </Text>
              </View>
          </TouchableOpacity>
        </ScrollView>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
    position: 'absolute'
  },
  rowContainer: {
    flexDirection: 'row',
    width: width,
    height: 155
  },
  itemContainer: {
    margin: 5,
    marginBottom: 0,
    backgroundColor: 'rgba(77, 77, 77, 0.52)',
    width: width/2 - 7.5 ,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height: 40,
    tintColor: 'white'
  },
  title: {
    paddingTop: 10,
    fontSize: 17,
    color: 'white'
  },
  button: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center'
  },
});
