/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, StyleSheet, Button, StatusBar, ImageBackground } from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import landing from "../components/assets/robot-landing-new.png"
import Card from './Card/Card';
const IntelligentRobot = ({ test }) => {
    const [inputData, setInputData] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
    });


    const handleInputChange = (name, text) => {
        setInputData((prevData) => ({
            ...prevData,
            [name]: text,
        }));
    };


    const handleSendData = () => {
        // Check if all inputs are filled
        for (const key in inputData) {
            if (inputData[key] === '') {
                console.warn('Please fill in all input fields.');
                return;
            }
        }

        // Convert input values to decimal numbers
        const dataBytes = [];
        for (let i = 1; i <= Object.keys(inputData).length; i++) {
            const inputValue = inputData[`input${i}`];
            dataBytes.push(Number(inputValue));
            if (i < Object.keys(inputData).length) {
                dataBytes.push(44); // ASCII code for comma
            }
        }

        // Add $TX before and ETX after
        const finalDataBytes = [36, 84, 88, 44, ...dataBytes, 44, 69, 84, 88]; // Decimal numbers for $TX and ETX
        console.log(finalDataBytes);

        // Send data
        RNBluetoothClassic.writeToDevice('98:D3:B1:FE:17:7E', new Uint8Array(finalDataBytes))
            .then(() => {
                console.log('Data sent successfully');
                setInputData('')
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    };



    return (
        <ImageBackground style={styles.continer} source={landing} resizeMode='cover'>
            <SafeAreaView style={styles.cardContiner}>
                <View style={styles.card} >
                    <Text style={styles.text}>RA1</Text>
                    <TextInput value={inputData.input1}
                        onChangeText={(text) => handleInputChange('input1', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                    />
                    <StatusBar style="auto" />
                </View>
                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA2</Text>
                        <TextInput value={inputData.input2}
                            onChangeText={(text) => handleInputChange('input2', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>
                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA3</Text>
                        <TextInput value={inputData.input3}
                            onChangeText={(text) => handleInputChange('input3', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>
                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA4</Text>
                        <TextInput value={inputData.input4}
                            onChangeText={(text) => handleInputChange('input4', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>

                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA5</Text>
                        <TextInput value={inputData.input5}
                            onChangeText={(text) => handleInputChange('input5', text)} style={styles.input} placeholder="Enter Number" keyboardType="numeric"
                        />
                    </SafeAreaView>

                </View>

                <View style={styles.card} >
                    <SafeAreaView>
                        <Text style={styles.text}>RA6</Text>
                        <TextInput value={inputData.input6}
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