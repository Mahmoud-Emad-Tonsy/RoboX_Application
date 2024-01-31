/* eslint-disable prettier/prettier */

import React, { useState, useContext } from 'react';
import { BluetoothContext } from '../../../../Global/BluetoothContext';
import AxisPad from '../../../lib/JoyStickLib/Joystick';
import { View, ImageBackground } from 'react-native';


import robotControl from "../../assets/imgs/robotControl.png"

const JoystickScreen = () => {


    // State variables to hold joystick data
    const [joystickData, setJoystickData] = useState(null);
    const [stopData, setStopData] = useState(null);
    const { connectedDevice } = useContext(BluetoothContext);

    const handleJoystickMove = async (data) => {
        let r = 60;
        r = 2 * r / 3;
        data.position.x -= r;
        data.position.y -= r;

        console.log(data);
        setJoystickData(data)


        //     try {
        //         // Convert joystick data to a string
        //         const finalDataBytes = [36, 84, 88, 44, joystickData.type.split("")[0], parseInt(joystickData.angle.degree) & 0xff, parseInt(joystickData.angle.degree) >> 8, parseInt(joystickData.force), parseInt(joystickData.position.x), parseInt(joystickData.position.y), 44, 69, 84, 88]; // Decimal numbers for $TX and ETX
        //         const finalStopDataBytes = [36, 84, 88, 44, data.type.split("")[0], parseInt(data.angle.degree), parseInt(data.angle.degree), parseInt(data.force), parseInt(data.position.x), parseInt(data.position.y), 44, 69, 84, 88]; // Decimal numbers for $TX and ETX

        //         console.log(finalDataBytes);
        //         // Send data to Arduino


        //         await RNBluetoothClassic.writeToDevice(connectedDevice?.address, finalDataBytes);

        //         // Log the sent data for reference
        //         console.log("Sent data to Arduino:", finalDataBytes);
        //         console.log("Stop data :", finalStopDataBytes);
        //     } catch (err) {
        //         console.log(err);
        //     }

        //     // Update state with joystick data
        //     setJoystickData(data);
        //     setStopData(data)
        // };

        // const handleJoystickStop = async (data) => {


        //     try {



        //     }
        //     catch (err) { console.log(err) }
    }


    return (
        <ImageBackground source={robotControl} resizeMode='cover' style={styles.container}>
            <View style={styles.joystickContainer}>
                <AxisPad color="#06b6d4" radius={60} onMove={handleJoystickMove} />
            </View>

        </ImageBackground>
    );
};

const styles = {
    container: {
        flex: 1,
        // backgroundColor: '#303036',
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'

    },
    joystickContainer: {
        marginTop: 20,
        padding: 10,

    },



};

export default JoystickScreen;


