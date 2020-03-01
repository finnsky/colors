import React, { useRef, useEffect }  from "react";
import { Animated, Image, ImageBackground, StyleSheet, View } from "react-native";
import { LuckyText } from '../components/StyledText';
import Button from '../components/Button';
import Styles from '../components/Styles';
import Layout  from '../constants/Layout';


export default function StartScreen({ navigation }) {
  return (
    <View style={Styles.container}>
      <LuckyText style={Styles.title}>Chips</LuckyText>
      <Image
        style={{
          width: Layout.size,
          height: Layout.size,
          maxWidth: 375,
          maxHeight: 375,
        }}
        resizeMode="contain"
        source={require('../assets/images/splash.png')}
      ></Image>
      <Button
        text="Get Started"
        onPress={() => navigation.navigate('Game')}
      ></Button>
    </View>
  )
}
