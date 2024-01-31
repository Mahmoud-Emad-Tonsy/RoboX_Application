/* eslint-disable prettier/prettier */

import React, { useEffect, useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import RNBluetoothClassic, {

} from 'react-native-bluetooth-classic';

import { PermissionsAndroid } from 'react-native';
import { BluetoothContext } from '../../../../../Global/BluetoothContext';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';



const Devices = () => {

  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setIsError] = useState(false);
  const [selectedDevice, setSelectedDevice] =
    useState(null);
  const [devices, setDevices] = useState([]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toast = useToast();


  const { setAvailable, pairedDevices, setPairedDevices, setDataReceived, connectedDevice, setConnectedDevice, isBluetoothEnable, setIsBluetoothEnable } = useContext(BluetoothContext);

  useEffect(() => {
    requestAccessFineLocationPermission();
    checkBluetoothAvailability();
    RNBluetoothClassic.onBluetoothEnabled(() => setIsBluetoothEnable(true));
    RNBluetoothClassic.onBluetoothDisabled(() => setIsBluetoothEnable(false));
    startScan();

    return () => {
      stopScan();
    };

  }, [selectedDevice, startScan, isBluetoothEnable]);


  const checkBluetoothAvailability = async () => {
    try {
      const isAvailable = await RNBluetoothClassic.isBluetoothAvailable();
      setAvailable(isAvailable);

      if (isAvailable) {
        const paired = await RNBluetoothClassic.getBondedDevices();
        setPairedDevices(paired);
      }
    } catch (err) {
      // console.error(
      //   'Error checking Bluetooth availability or getting paired devices:',
      //   err
      // );
      toast.show('Bluetooth is offline Please Open Bluetooth', {
        type: 'danger',
        placement: 'bottom',
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      }
      )
    }
  };

  const connectToDevice = async (device) => {
    try {
      const connectOptions = {
        CONNECTION_TYPE: 'binary',
      };

      await device.connect(connectOptions);
      onDeviceConnected({ device });
      // console.log(device.id, "iam id");
      console.log("Connected and ready to Send and Receive data");
      toast.show("Connected Successfully", {
        type: 'success',
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',

      })
      navigation.navigate("Dashboard")
    } catch (err) {
      toast.show("failed connection please connect again", {
        type: 'danger',
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: 'zoom-in',
      })
    }
  };

  const onDeviceConnected = (event) => {
    setConnectedDevice(event.device);
    startContinuousDataReading(event.device);
  };

  const startContinuousDataReading = (device) => {
    const intervalId =
      setInterval(
        async () => {
          try {
            if (await device.isConnected()) {
              const dataString = await device.read();

              if (dataString !== null) {
                console.log("Read Data:", dataString);
                setDataReceived(dataString);
              } else {
                console.log("No data available to read");
              }
            } else {

              toast.show("Device is not connected. Please Connect Again", {
                type: 'danger',
                placement: "bottom",
                duration: 3000,
                offset: 30,
                animationType: 'zoom-in',
              }
              )
              clearInterval(intervalId);
            }
          } catch (error) {
            toast.show("Bluetooth is offline Please Open Bluetooth", {
              type: 'danger',
              placement: "bottom",
              duration: 3000,
              offset: 30,
              animationType: 'zoom-in',
            }
            )
            clearInterval(intervalId);
          }
        }, 1000);

    return () => clearInterval(intervalId);
  };

  const disconnectFromDevice = async (device) => {
    try {
      await device.disconnect();
      setConnectedDevice(null);
    } catch (err) {
      console.error("Error disconnecting from the device:", err);
    }
  };
  const requestAccessFineLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Access fine location required for discovery",
        message:
          "In order to perform discovery, you must enable/allow " +
          "fine location access.",
        // buttonNeutral: "Ask Me Later",
        // buttonNegative: "Cancel",
        buttonPositive: "OK",
      }

    );
    return (
      granted === PermissionsAndroid.RESULTS.GRANTED,
      console.log("Location permission granted")
    );
  };
  const startScan = async () => {
    try {
      await RNBluetoothClassic.startDiscovery();
      console.log('Scanning...');
    } catch (error) {
      console.log('Error starting scan:', error);
    }
  };

  const stopScan = async () => {
    try {
      await RNBluetoothClassic.cancelDiscovery();
      console.log('Scan stopped');
    } catch (error) {
      console.log('Error stopping scan:', error);
    }
  };


  const pairDevice = async (device) => {

    try {

      await RNBluetoothClassic.pairDevice(device);
      setSelectedDevice(device);
      console.log('Device paired successfully');

    } catch (error) {
      console.log('Error pairing device:', error);
    }
  };

  RNBluetoothClassic.onDeviceDiscovered(device => {
    setDevices(prevDevices => {
      // Check if the device is not already in the list
      if (!prevDevices.some(prevDevice => prevDevice.id === device.id)) {
        return [...prevDevices, device];
      }
      return prevDevices;
    });
  });


  return (


    <SafeAreaView style={styles.constiner}>
      <ScrollView>

        <View>
          {pairedDevices.length > 0 && (
            <View>
              <Text style={styles.Connection_Devices}>
                {`Connection Devices : ${connectedDevice
                  ? `${connectedDevice?.name} is Connected`
                  : 'Not Device Connected'
                  }`}
              </Text>
              {pairedDevices.map((device, index) => (
                <View key={index} style={styles.cardConnection}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Button
                    title="Connect"
                    onPress={() => connectToDevice(device)}
                    color="#22A39F"
                  />

                  {connectedDevice?.address === device.address && (
                    <Button
                      title="Disconnect"
                      onPress={() => disconnectFromDevice(device)}
                      color="#22A39F"
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <View>
          {devices.length > 0 && (
            <View>
              <View style={styles.BoxLoading}>
                <Text style={styles.Connection_Devices}>Paired Devices</Text>

              </View>

              {devices.map((device, index) => (
                <View key={index} style={styles.cardConnection}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  <Button color="#22A39F" title="Pair Device" onPress={() => pairDevice(device?.id)} />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};

export default Devices;

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    backgroundColor: "black",
  },

  bluIsAvailable: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 5,
    color: 'white'
  },

  Connection_Devices: {
    fontSize: 14,
    marginTop: 15,
    marginLeft: 5
  },
  cardConnection: {
    backgroundColor: "#272727",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,

  },
  deviceName: {
    fontSize: 15,
    fontWeight: "bold",

  },

  isEnableBlue: {

    marginTop: 10,
    fontSize: 20,
    color: 'white'
  },
  BoxLoading: {


  }
});



