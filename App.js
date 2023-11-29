/* eslint-disable prettier/prettier */

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState } from 'react';
import MainDrawer from './src/components/Drawer/MainDrawer';
import { MainProvider, MainContext } from "./Global/BluetoothContext"
const App = () => {
  return (
    <React.Fragment>

      <MainDrawer />
    </React.Fragment>
  );
};

export default App;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 64,
//         borderWidth: 6,
//         borderColor: "red",
//     },
// });
