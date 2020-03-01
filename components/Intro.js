import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppIntroSlider from 'react-native-app-intro-slider';
import Styles from './Styles';
import { LuckyText } from './StyledText';
import Layout  from '../constants/Layout';

const data = [
  {
    text: 'click on the biggest piece!',
    image: require('../assets/images/tut1.png'),
  },
  {
    text: 'And one more time!',
    image: require('../assets/images/tut2.png'),
  },
  {
    text: "How far can you go?",
    image: require('../assets/images/tut3.png'),
  },
];

export default class Intro extends React.Component {
  _renderItem = ({item}) => {
    return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Image
          resizeMode="contain"
          source={item.image}
          style={{
            width: Layout.size,
            height: Layout.size * 1.6,
            maxHeight: Layout.window.height - 200,
            flexBasis: Layout.size * 1.6,
            flex: 1,
            marginTop: 10,
        }}
        />
        <LuckyText style={Styles.subtitle}>{item.text}</LuckyText>
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={Styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={36}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={Styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={36}
        />
      </View>
    );
  };

  _keyExtractor = (item) => item.text;

  render() {
    return (
      <View style={Styles.slides} >
        <AppIntroSlider
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          dotStyle={Styles.dotStyle}
          activeDotStyle={Styles.activeDotStyle}
          data={data}
          onDone={this.props.onDone}
        />
      </View>

    );
  }
}
