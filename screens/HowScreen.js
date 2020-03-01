import React from "react";
import Intro from '../components/Intro';

export default function HowScreen({ navigation }) {
  return (
    <Intro onDone={() => navigation.navigate('Game')} />
  )
}
