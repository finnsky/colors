import * as React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function LuckyText(props) {
  return <Text
    {...props}
    style={[
      props.style, {
        fontFamily: 'LuckiestGuy',
        textShadowOffset: {
          width: 0,
          height: 3,
        },
        textShadowColor: "rgba(0, 0, 0, 0.16)",
        textShadowRadius: 6,
      }
    ]}
  />;
}

export function Heading(props) {
  return <Text {...props} />;
}
