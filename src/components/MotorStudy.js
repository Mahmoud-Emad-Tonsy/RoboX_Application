
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  StatusBar,
} from "react-native";

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventType,
  BluetoothReadEvent,
} from "react-native-bluetooth-classic";
import { BluetoothContext } from "../../Global/BluetoothContext";

const MotorStudy = () => {
  const { inputData, setInputData, dataReceived } = useContext(BluetoothContext)
  const handleInputChange = (name, text) => {
    setInputData((prevData) => ({ ...prevData, [name]: text }));
  };

  const handleSendData = () => {
    for (const key in inputData) {
      if (inputData[key] === "") {
        console.warn("Please fill in all input fields.");
        return;
      }
    }

    const dataBytes = [];
    for (let i = 1; i <= Object.keys(inputData).length; i++) {
      const inputValue = inputData[`input${i}`];

      if (i === 3) {
        const intValue = Number(inputValue);
        dataBytes.push(intValue & 0xff);
        dataBytes.push((intValue >> 8) & 0xff);
      } else {
        dataBytes.push(Number(inputValue));
      }

      if (i < Object.keys(inputData).length) {
        dataBytes.push(44);
      }
    }

    const finalDataBytes = [36, 84, 88, 44, ...dataBytes, 44, 69, 84, 88];
    console.log(finalDataBytes);

    RNBluetoothClassic.writeToDevice(
      "98:D3:B1:FE:17:7E",
      new Uint8Array(finalDataBytes)
    )
      .then(() => {
        console.log("Data sent successfully");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.text}>Servo Angle</Text>
          <TextInput
            value={inputData.input1}
            onChangeText={(text) => handleInputChange("input1", text)}
            style={styles.input}
            placeholder="Enter Number"
            keyboardType="numeric"
          />
          <StatusBar style="auto" />
        </View>
        <View style={styles.card}>
          <SafeAreaView>
            <Text style={styles.text}>Stepper</Text>
            <TextInput
              value={inputData.input2}
              onChangeText={(text) => handleInputChange("input2", text)}
              style={styles.input}
              placeholder="Enter dir"
              keyboardType="numeric"
            />
            <TextInput
              value={inputData.input3}
              onChangeText={(text) => handleInputChange("input3", text)}
              style={styles.input}
              placeholder="Enter steps"
              keyboardType="numeric"
            />
          </SafeAreaView>
        </View>
        <View style={styles.card}>
          <SafeAreaView>
            <Text style={styles.text}>Dc Motor</Text>
            <TextInput
              value={inputData.input4}
              onChangeText={(text) => handleInputChange("input4", text)}
              style={styles.input}
              placeholder="Enter dir"
              keyboardType="numeric"
            />
            <TextInput
              value={inputData.input5}
              onChangeText={(text) => handleInputChange("input5", text)}
              style={styles.input}
              placeholder="Enter Speed"
              keyboardType="numeric"
            />
          </SafeAreaView>
        </View>

        <View style={styles.btn}>
          <Button title="Sent" color="#272727" onPress={handleSendData} />
        </View>
        <View style={styles.btn}>
          <Text>
            Data : {dataReceived}
          </Text>
        </View>

      </SafeAreaView>
      <View />
    </SafeAreaView>
  );
};

export default MotorStudy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  btn: {
    width: 300,
    marginTop: 15,
    borderRadius: 15,
    padding: 5,
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: StatusBar.currentHeight,
    flexWrap: "wrap",
    gap: 20,
  },

  card: {
    width: 170,
    height: 130,
    backgroundColor: "#22A39F",
    elevation: 5,
    borderRadius: 10,
    padding: 15,
    marginTop: 12,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    // color: '#fff'
  },
  input: {
    borderWidth: 1,
    height: 27,
    marginTop: 12,
    padding: 5,
    // backgroundColor: '#fff',
    borderRadius: 6,
    fontWeight: "bold",
  },
});
