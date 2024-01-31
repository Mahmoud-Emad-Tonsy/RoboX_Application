/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Button, StyleSheet, Image } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { SafeAreaView } from 'react-native-safe-area-context';
import bedologo from '../../../assets/imgs/bedo-logo.png';
import { useNavigation } from '@react-navigation/native';
import robot from '../../../assets/imgs/robotControl.png';

const BluetoothDashboard = () => {

  const navigation = useNavigation();

  const OpenBlutoothAndNav = async () => {

    try {

      await RNBluetoothClassic.requestBluetoothEnabled();
      navigation.navigate("Scan Bluetooth")

    }
    catch (err) { console.log(err) }

  }
  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.logoStyle}>
        <Image source={bedologo} resizeMode="cover" />
      </View>
      <View>
        <Image source={robot} resizeMode="cover" style={styles.imgRobotSyle} />
      </View>
      <View style={styles.btnStyle}>
        <Button title="Open Bluetooth" color="#303036" onPress={() => OpenBlutoothAndNav()} />
      </View>
    </SafeAreaView>

  );
};

export default BluetoothDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoStyle: { marginLeft: 'auto', marginRight: 'auto', padding: 15 },
  imgRobotSyle: { marginLeft: 'auto', marginRight: 'auto', objectFit: 'cover' },
  btnStyle: { marginLeft: 'auto', marginRight: 'auto' }

});
