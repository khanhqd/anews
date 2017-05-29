import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  TextInput,
  WebView,
  Share,
  Linking,
  Clipboard,
  AsyncStorage,
  Platform
} from 'react-native';

var { height, width } = Dimensions.get('window');

import { Navigation } from 'react-native-navigation';
import { RunsItem, Button1 } from '../common';
const cheerio = require('cheerio-without-node-native');
import * as Animatable from 'react-native-animatable';

var Toast = require('react-native-toast');

export default class NewsDetail extends Component {
  static
  navigatorStyle = {
    navBarHidden: false,
    navBarBackgroundColor: '#889C9B',
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    navBarHideOnScroll: true
  };
  static
  navigatorButtons = {
    rightButtons: [
      {
        title: 'Menu', // for a textual button, provide the button title (label)
        id: 'menu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        buttonColor: 'white', // Optional, iOS only. Set color for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontSize: 14, // Set font size for the button (can also be used in setButtons function to set different button style programatically)
        buttonFontWeight: '600', // Set font weight for the button (can also be used in setButtons function to set different button style programatically)
      }
    ],
  };
  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.state = {
      html: '',
      postBackground: 'white',
      paddingLeft: 15,
      openMenu: false,
      fontSize: 15,
      bookMark: [],
      baseHTML: '',
      textSelected: '',
      isSaved: false
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this._get('bookMark');
    this.fetchContent()
  };
  componentDidMount() {
    let urlPost = this.props.row.url;
    let list = this.state.bookMark;
    list.some(function (el) {
      if (el.url == urlPost) {
        this.setState({ isSaved: true })
      }
    })
  }
  _set = async (key, value) => {
    try { await AsyncStorage.setItem(key, value); }
    catch (error) { console.log(error.message) }
  };
  _get = async (key) => {
    try {
      var value = await AsyncStorage.getItem(key);
      if (value !== null) {
        switch (key) {
          case 'bookMark':
            this.setState({ bookMark: JSON.parse(value) });
            break;
        }
      }
    } catch (error) { alert(error) }
  };
  returnHtml = () => {
    console.log('return New')
    let htmlPlus = `
    <style>
      a{
        text-decoration: none;
        color: black
      }
      * {
        -webkit-touch-callout: none !important;
      }
      h3, p, .block_timer_share,.item_slide_show{
        margin-left: ${this.state.paddingLeft}px;
        line-height: 1.3em;
        margin-right: 10px;
        font-size: ${this.state.fontSize}
      }
      .relative_new, .title_news, .block_share.right, .Image{
        display: none
      }
      html, body{
        width: ${width}px;
        overflow-x:hidden;
        font-family: 'Nunito', sans-serif;
        margin-left: -1px;
        margin-right: 3px;
        background-color: ${this.state.postBackground}
      }
      img{
        height:200px;
        width:${width}px;
      }
    </style>
    <script>
      var link = document.querySelectorAll("a");
      for(var i = 0; i < link.length; i++){
        link[i].setAttribute("href", "javascript:void(0)");
      };

      function getSelectionText() {
          var text = "";
          var activeEl = document.activeElement;
          var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
          if (
            (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
            (typeof activeEl.selectionStart == "number")
          ) {
              text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
          } else if (window.getSelection) {
              text = window.getSelection().toString();
          }
          return text;
      }

      document.onmouseup = document.onkeyup = document.onselectionchange = function() {
        window.postMessage(getSelectionText());
      };
    </script>
    `;
    return htmlPlus
  }
  fetchContent() {
    let url = this.props.row.url
    fetch(this.props.row.url)
      .then((response) => response.text())
      .then((responseData) => {
        $ = cheerio.load(responseData)
        // phân biệt các thể loại url
        if (url.includes('http://vnexpress.net/projects/') == true) {
          this.setState({ baseHTML: $('.wrapper').html() }, () => {
            this.setState({
              html: `
              <body>
              ${this.state.baseHTML + this.returnHtml()}
              </body>
            `})
          })
        }
        else {
          if ($('#container_tab_live').html() !== null) {
            this.setState({ baseHTML: $('#container_tab_live').html() }, () => {
              this.setState({
                html: `
              <body>
              ${this.state.baseHTML + this.returnHtml()}
              </body>
            `
              })
            })
          }
          if ($('.block_content_slide_showdetail').html() !== null) {
            this.setState({ baseHTML: $('.block_content_slide_showdetail').html() }, () => {
              this.setState({
                html: `
              <body>
              ${this.state.baseHTML + this.returnHtml()}
              </body>
            `
              })
            })
          }
          else {
            this.setState({ baseHTML: $('#left_calculator').html() }, () => {
              this.setState({
                html: `
              <body>
              ${this.state.baseHTML + this.returnHtml()}
              </body>
            `})
            })
          }
        }
      })
  }
  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'create') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.push({
          screen: 'parcel.CreateRun',
          title: 'Create Run'
        });
      }
      if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
        this.setState({ openMenu: !this.state.openMenu })
      }
    }
  }
  // () => {
  //   this.setState({  html:
  //       `<body>
  //         ${$('#left_calculator').html() + this.returnHtml()}
  //         </body>
  //       `})
  // }
  loading() {
    if (this.state.html != '') {
      return (
        <WebView
          style={{ width: width }}
          javaScriptEnabled={true}
          onMessage={(event) => { this.setState({ textSelected: event.nativeEvent.data }) }}
          source={{ html: this.state.html }} />
      )
    } else {
      return (
        <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Loading...
        </Text>
      )
    }
  }
  _share() {
    Share.share({
      message: this.props.row.title,
      url: this.props.row.url,
      title: 'From News App'
    }, {
        dialogTitle: 'From News App',
        // excludedActivityTypes: [
        //   'com.apple.UIKit.activity.PostToTwitter'
        // ],
        tintColor: 'green'
      })
      .then(this._showResult)
      .catch((error) => this.setState({ result: 'error: ' + error.message }));
  }
  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({ result: 'shared with an activityType: ' + result.activityType });
      } else {
        this.setState({ result: 'shared' });
      }
      alert(this.state.result)
    } else if (result.action === Share.dismissedAction) {
      this.setState({ result: 'dismissed' });
      alert(this.state.result)
    }
  }
  _openLink() {
    Linking.canOpenURL(this.props.row.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.row.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.row.url);
      }
    });
  }
  _saveBookmark() {
    if (!this.state.loading) {
      this.setState({ loading: true })
      let list = this.state.bookMark;
      if (!this.state.isSaved) {
        var favor = {
          title: this.props.row.title,
          url: this.props.row.url,
          thumb: this.props.row.thumb,
          html: this.state.html
        }
        list.push(favor)
        this._set('bookMark', JSON.stringify(list))
        this.setState({ isSaved: true, loading: false })
      }
      Toast.show('Đã lưu');
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        {this.loading()}
        {(this.state.textSelected != '') &&
          <Animatable.View animation="slideInUp" duration={300} style={styles.shareModal}>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                Share.share({
                  message: this.state.textSelected,
                  url: this.props.row.url,
                  title: 'From News App'
                }, {
                    dialogTitle: 'From News App',
                    // excludedActivityTypes: [
                    //   'com.apple.UIKit.activity.PostToTwitter'
                    // ],
                    tintColor: 'green'
                  })
                  .then(this._showResult)
                  .catch((error) => this.setState({ result: 'error: ' + error.message }));
              }}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Share link kèm trích dẫn
                      </Text>
              </View>
            </TouchableHighlight>
          </Animatable.View>
        }
        {this.state.openMenu &&
          <Animatable.View animation="slideInDown" duration={300} style={styles.menuModal}>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this.setState({ fontSize: this.state.fontSize + 1 }, () => {
                console.log(this.state.html)
                this.setState({
                  html:
                  `<body>
                      ${this.state.baseHTML + this.returnHtml()}
                      </body>
                    `})
              })}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>A+
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this.setState({ fontSize: this.state.fontSize - 1 }, () => {
                console.log(this.state.fontSize)
                this.setState({
                  html:
                  `<body>
                      ${this.state.baseHTML + this.returnHtml()}
                      </body>
                    `})
              })}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>A-
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this._share()}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Share
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this._openLink()}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Mở trình duyệt
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => this._saveBookmark()}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Lưu
                      </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                Clipboard.setString(this.props.row.url);
                Toast.show('Đã sao chép link');
              }}
              style={styles.modalItem}>
              <View>
                <Text style={styles.modalText}>Sao chép
                      </Text>
              </View>
            </TouchableHighlight>
          </Animatable.View>
        }
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
  },
  menuModal: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        zIndex: 3,
      },
      android: {
        borderColor: 'rgb(217, 217, 217)',
        borderLeftWidth: 0.5,
        zIndex: 4
      }
    }),
    top: 0,
    right: 0,
    width: 100,
    elevation: 5,
    shadowOpacity: 0.3
  },
  modalItem: {
    height: 35,
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'rgb(217, 217, 217)',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalText: {

  },
  shareModal: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        zIndex: 3,
      },
      android: {
        borderColor: 'rgb(217, 217, 217)',
        borderLeftWidth: 0.5,
        zIndex: 4
      }
    }),
    bottom: 0,
    elevation: 5,
    shadowOpacity: 0.3,
    width: '100%'
  }

});
