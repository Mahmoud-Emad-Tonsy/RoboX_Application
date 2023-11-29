/* eslint-disable prettier/prettier */

import React, { useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RNBluetoothClassic, {
} from 'react-native-bluetooth-classic';

import { PermissionsAndroid } from 'react-native';
import { BluetoothContext } from '../../../Global/BluetoothContext';
const Devices = () => {
  const {

    available, setAvailable, pairedDevices, setPairedDevices, dataReceived, setDataReceived, connectedDevice, setConnectedDevice
  } = useContext(BluetoothContext);
  const checkBluetoothAvailability = async () => {
    try {
      const isAvailable = await RNBluetoothClassic.isBluetoothAvailable();
      setAvailable(isAvailable);

      if (isAvailable) {
        const paired = await RNBluetoothClassic.getBondedDevices();
        setPairedDevices(paired);
      }
    } catch (err) {
      console.error(
        'Error checking Bluetooth availability or getting paired devices:',
        err
      );
    }
  };

  useEffect(() => {
    requestAccessFineLocationPermission();
  }, []);

  const connectToDevice = async (device) => {
    try {
      const connectOptions = {
        CONNECTION_TYPE: 'binary',
      };

      await device.connect(connectOptions);
      onDeviceConnected({ device });
      console.log(device.id, "iam id");
      console.log("Connected and ready to Send and Receive data");
    } catch (err) {
      console.error("Error connecting to the device:", err);
    }
  };

  const onDeviceConnected = (event) => {
    setConnectedDevice(event.device);
    startContinuousDataReading(event.device);
  };

  const startContinuousDataReading = (device) => {
    const intervalId = setInterval(async () => {
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
          console.warn("Device is not connected. Stopping data reading.");
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error reading data from the device:", error);
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
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return (
      granted === PermissionsAndroid.RESULTS.GRANTED,
      console.log("Location permission granted")
    );
  };

  return (
    <View style={styles.constiner}>
      <View style={styles.checkBlue}>
        <Button
          title="Open Bluetooth Availability"
          onPress={checkBluetoothAvailability}
          color="#22A39F"
        />
      </View>

      {available !== null && (
        <Text style={styles.bluIsAvailable}>
          Bluetooth is
          {available ? (
            <Text style={styles.Available}>Available</Text>
          ) : (
            <Text style={styles.Unvailable}>Unvailable</Text>
          )}
        </Text>
      )}

      {pairedDevices.length > 0 && (
        <View>
          <Text style={styles.Connection_Devices}>
            {`Connection Devices : ${connectedDevice
              ? `${connectedDevice?.name} is Connected`
              : "Not Device Connected"
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
      <Text> {dataReceived && <Text>Data Received: {dataReceived}</Text>}</Text>
    </View>
  );
};

export default Devices;

const styles = StyleSheet.create({
  constiner: {
    flex: 1,
    backgroundColor: "#000000",
  },
  checkBlue: {
    marginTop: 10,
    padding: 20,
  },
  bluIsAvailable: {
    fontSize: 20,
    marginTop: 10,
  },
  Available: {
    color: "#9ADE7B",
  },
  Unvailable: {
    color: "red",
  },
  Connection_Devices: {
    fontSize: 14,
    marginTop: 15,
  },
  cardConnection: {
    backgroundColor: "#272727",
    padding: 20,
    borderRadius: 20,
    marginTop: 15,
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
});
