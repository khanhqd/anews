import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  RefreshControl
} from 'react-native';

var {height, width} = Dimensions.get('window');

import { Navigation } from 'react-native-navigation';
import { NewsItem, Button1 } from '../common';
const cheerio = require('cheerio-without-node-native');

export default class News extends Component {
  static
    navigatorStyle = {
      navBarHidden: false,
      navBarBackgroundColor: '#889C9B',
      navBarTextColor: 'white'
    };
  static
    navigatorButtons = {
      leftButtons: [
        {
          title: 'Back', // for a textual button, provide the button title (label)
          id: 'back', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
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
      page: 1,
      data: [],
      refreshing: false,
      isLoadMore: false
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.onScroll = this.onScroll.bind(this)
  };
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    let data = this.state.data
    let array1 = []
    let array2 = []
    let array3 = []
    fetch(`http://thethao.vnexpress.net/page/${this.state.page}.html`)
      .then((response) => response.text())
      .then((responseData) => {
          $ = cheerio.load(responseData)
          $('.block_mid_new >ul >li> div>div>a>img').each(function () {
            let src = $(this).attr('src')
            array1.push(src)
          })
          $('.block_mid_new >ul >li>h3>a.txt_link').each(function () {
            array2.push({
              href: $(this).attr('href'),
              title: $(this).attr('title')
            })
          })
          $('.block_mid_new >ul >li> div>div.news_lead').each(function () {
            let description = $(this).text()
            var newString = description.replace(/\s+ /g, "")
            array3.push(newString)
          })
          for (let i = 0; i < array1.length; i++) {
            data.push({
              thumb: array1[i],
              url: array2[i].href,
              title: array2[i].title,
              description: array3[i]
            })
          }
          console.log(data)
          this.setState({
            data: data,
            isLoadMore: false,
            refreshing: false
          })
      })

  }

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'back') { // this is the same id field from the static navigatorButtons definition
        this.props.navigator.pop()
      }
    }
  }
  loadMore() {
    this.setState({
      page: this.state.page + 1,
      isLoadMore: true,
    }, () => this.fetchData())
  }
  onScroll(e) {
    var windowHeight = Dimensions.get('window').height;
    var height = e.nativeEvent.contentSize.height;
    var offset = e.nativeEvent.contentOffset.y;

    if (windowHeight + offset > height + 30) {
      if (!this.state.isLoadMore) {
        this.loadMore();
      }
    }
  }
  onRefresh() {
    this.setState({
      refreshing: true
    }, () => this.fetchData())
  }
  render() {
    return (
      <ScrollView
      refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      style={{ flex: 1 }} onScroll={this.onScroll}>

          {this.state.data.map((row,index) => {
            return (
              <NewsItem
              onPress = {() => this.props.navigator.push({
                screen: "parcel.NewsDetail", title: row.title,
                passProps: { row: row },
              })}
              key = {index}
              title = {row.title}
              thumb = {row.thumb}
              description = {row.description}/>
            )
          })}


      </ScrollView >
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
