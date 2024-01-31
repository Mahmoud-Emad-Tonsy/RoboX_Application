/* eslint-disable prettier/prettier */

import React, { useState, useContext } from 'react';
import { BluetoothContext } from "../../../../Global/BluetoothContext";
import { useToast } from "react-native-toast-notifications";


import { View, Text, TextInput, SafeAreaView, StyleSheet, Button, StatusBar, ImageBackground } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import landing from "../../assets/imgs/new-landing.jpg"
const IntelligentRobot = () => {
    const { inputDataRA, setInputDataRA, connectedDevice, isBluetoothEnable } = useContext(BluetoothContext)
    const toast = useToast();

    const handleInputChange = (name, text) => {
        setInputDataRA((prevData) => ({
            ...prevData,
            [name]: text,
        }));
    };


    const handleSendData = () => {
        // Check if all inputs are filled

        if (isBluetoothEnable) {
            if (connectedDevice) {
                for (const key in inputDataRA) {
                    if (inputDataRA[key] === '') {
                        toast.show('Please fill in all input fields', {
                            type: "warning",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: 'zoom-in',

                        })
                        return;
                    }
                }

                // Convert input values to decimal numbers
                const dataBytes = [];
                for (let i = 1; i <= Object.keys(inputDataRA).length; i++) {
                    const inputValue = inputDataRA[`input${i}`];
                    dataBytes.push(Number(inputValue));
                    if (i < Object.keys(inputDataRA).length) {
                        dataBytes.push(44); // ASCII code for comma
                    }
                }

                // Add $TX before and ETX after
                const finalDataBytes = [36, 84, 88, 44, 82, 65, 44, ...dataBytes, 44, 69, 84, 88]; // Decimal numbers for $TX and ETX
                console.log(finalDataBytes);

                // Send data

                RNBluetoothClassic.writeToDevice(connectedDevice?.address, new Uint8Array(finalDataBytes))
                    //address is 98:D3:B1:FE:17:7E Right now is dynaminc
                    .then(() => {
                        console.log('Data sent successfully');
                        toast.show('Data sent successfully', {
                            type: 'success',
                            placement: 'bottom',
                            duration: 3000,
                            offset: 30,
                            animationType: 'zoom-in',

                        })
                        setInputDataRA('')
                    })
                    .catch((error) => {
                        console.error('Error sending data:', error);
                    });


            } else {
                toast.show("Not connection device")
            }

        } else {
            //please close and open bluetooth and connect again
            toast.show("Bluetooth Not Connected Please Open Bluetooth",

                {

                    type: 'danger',
                    placement: "bottom",
                    duration: 3000,
                    offset: 30,
                    animationType: 'zoom-in',


                }

            );


        }


    };



    return (
        <ImageBackground style={styles.continer} source={landing} resizeMode='cover'>
            <SafeAreaView style={styles.cardContiner}>
                <View style={styles.card} >
                    <Text style={styles.text}>RA1</Text>
                    <TextInput value={inputDataRA.input1}
                        onChangeText={(text) => handleInputChange('input1', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                    />
                    <StatusBar style="auto" />
                </View>
                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA2</Text>
                        <TextInput value={inputDataRA.input2}
                            onChangeText={(text) => handleInputChange('input2', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>
                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA3</Text>
                        <TextInput value={inputDataRA.input3}
                            onChangeText={(text) => handleInputChange('input3', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>
                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA4</Text>
                        <TextInput value={inputDataRA.input4}
                            onChangeText={(text) => handleInputChange('input4', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>

                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA5</Text>
                        <TextInput value={inputDataRA.input5}
                            onChangeText={(text) => handleInputChange('input5', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>

                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA6</Text>
                        <TextInput value={inputDataRA.input6}
                            onChangeText={(text) => handleInputChange('input6', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>


                <View style={styles.btn}>
                    <Button title='Sent' color='#272727' onPress={handleSendData} />
                </View>

            </SafeAreaView>

        </ImageBackground>
    );
};

export default IntelligentRobot;

const styles = StyleSheet.create({
    continer: {
        flex: 1,
        backgroundColor: '#000000',



    },
    btn: {
        width: 200,
        marginTop: 15,
        borderRadius: 15,
        padding: 5

    },
    cardContiner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: StatusBar.currentHeight,
        flexWrap: 'wrap',
        gap: 20
    },

    card: {
        width: 150,
        height: 100,
        backgroundColor: '#222222',
        elevation: 5,
        borderRadius: 10,
        padding: 15,
        marginTop: 12,



    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'

    },
    input: {
        // borderWidth: 1,
        height: 27,
        marginTop: 12,
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 6,
        color: 'black',

    },
})