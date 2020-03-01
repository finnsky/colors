import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import { Audio } from 'expo-av';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from './screens/GameScreen';
import HowScreen from './screens/HowScreen';
import StartScreen from './screens/StartScreen';


import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const soundObject = new Audio.Sound();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'LuckiestGuy': require('./assets/fonts/LuckiestGuy-Regular.ttf'),
        });

        await soundObject.loadAsync(require('./assets/sounds/POL-wacky-race-short.wav'));
        await soundObject.replayAsync();
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <NavigationContainer initialRouteName="Start">
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="How"
            component={HowScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Game"
            component={GameScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
