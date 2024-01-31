/* eslint-disable prettier/prettier */

import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView,
} from "react-native";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import RNPickerSelect from 'react-native-picker-select';
import { BluetoothContext } from "../../../../Global/BluetoothContext";
import servoAngleImg from "../../assets/imgs/m1.png"
import stepperImg from "../../assets/imgs/m7.jpg"
import dcMotorImg from "../../assets/imgs/m2.jpeg"



const MotorStudy = () => {
  const { inputData, setInputData, dataReceived, connectedDevice } = useContext(BluetoothContext)
  const handleInputChange = (name, text) => {
    setInputData((prevData) => ({ ...prevData, [name]: text }));
  };



  const handleSendData = () => {
    for (const key in inputData) {
      if (inputData[key] === "") {
        console.warn("Please fill in all input fields.");
        return;
      }
      setInputData("")
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
      //address is 98:D3:B1:FE:17:7E Right now is dynaminc
      connectedDevice?.address,
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
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.cardContainer}>
        <ImageBackground source={servoAngleImg} resizeMode="cover" style={[styles.card, { justifyContent: 'center', alignItems: 'center', marginTop: 10 }]}>
          <Text style={styles.text}>Servo Angle</Text>
          <TextInput
            value={inputData.input1}
            onChangeText={(text) => handleInputChange("input1", text)}
            style={styles.input}
            placeholder="Enter Number"
            keyboardType="numeric"
            placeholderTextColor='#fff'
          />
        </ImageBackground>
        <ImageBackground source={stepperImg} resizeMode="cover" style={styles.card}>
          <SafeAreaView>
            <Text style={styles.text}>Stepper</Text>
            <View style={styles.ChildCardContainer}>
              <RNPickerSelect
                style={{
                  inputAndroid: {

                    width: "100%"


                  },

                  viewContainer: {
                    backgroundColor: '',
                    borderWidth: 0.5,
                    borderColor: '#fff',
                    borderRadius: 8,
                    color: '#fff',
                    width: 140,


                  },
                  placeholder: { color: '#fff' }
                }}
                onValueChange={(value) => handleInputChange("input2", value)}
                items={[
                  { label: 'Right', value: '0' },
                  { label: 'Left', value: '1' },

                ]}
                placeholder={{
                  label: 'Diraction',
                  value: null,
                  color: '',

                }}

              />

              <TextInput
                value={inputData.input3}
                onChangeText={(text) => handleInputChange("input3", text)}
                style={styles.input}
                placeholder="Enter steps"
                keyboardType="numeric"
                placeholderTextColor='#fff'
              />
            </View>
          </SafeAreaView>
        </ImageBackground>
        <ImageBackground source={dcMotorImg} style={styles.card}>
          <SafeAreaView>
            <Text style={styles.text}>Dc Motor</Text>
            <View style={styles.ChildCardContainer}>
              <RNPickerSelect
                style={{
                  inputAndroid: {
                    width: "100%"
                  },

                  viewContainer: {
                    backgroundColor: '',
                    borderWidth: 0.5,
                    borderColor: '#fff',
                    borderRadius: 8,
                    color: '#fff',
                    width: 140,


                  },
                  placeholder: { color: '#fff' }
                }}
                onValueChange={(value) => handleInputChange("input4", value)}
                items={[
                  { label: 'Right', value: '0' },
                  { label: 'Left', value: '1' },

                ]}
                placeholder={{
                  label: 'Diraction',
                  value: null,
                  color: '',

                }}

              />
              <TextInput
                value={inputData.input5}
                onChangeText={(text) => handleInputChange("input5", text)}
                style={styles.input}
                placeholder="Enter Speed"
                keyboardType="numeric"
                placeholderTextColor='#fff'
              />
            </View>

          </SafeAreaView>
        </ImageBackground>

        <View style={styles.btn}>
          <Button title="Sent" color="#272727" onPress={handleSendData} />
        </View>
        <View style={styles.btn}>
          <Text>
            {dataReceived}
          </Text>
        </View>

      </SafeAreaView>
      <View />
    </ScrollView>
  );
};

export default MotorStudy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",



  },
  btn: {
    width: 250,
    marginTop: 15,
    borderRadius: 15,
    padding: 5,
  },
  cardContainer: {

    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    flexWrap: "wrap",
    gap: 20,
    marginTop: 80
  },

  card: {
    width: 350,
    height: 130,
    backgroundColor: "#22A39F",
    elevation: 5,
    borderRadius: 15,
    padding: 20,

  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 10
  },
  input: {
    borderWidth: 0.5,
    borderRadius: 6,
    fontWeight: "bold",
    padding: 15,
    width: 140,
    borderColor: '#fff'

  },
  ChildCardContainer: {
    display: 'flex',
    backgroundColor: '',
    width: "100%",
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    marginTop: 10
  }
});
