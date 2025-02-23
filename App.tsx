import { View, Text } from 'react-native'
import 'react-native-gesture-handler'
import React from 'react'
import Navigation from '@navigation/Navigation'

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

const App = () => {
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: true, // Reanimated runs in strict mode by default
  });
  return (
   <Navigation />
  )
}
 

export default App