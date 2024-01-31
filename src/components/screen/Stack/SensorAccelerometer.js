/* eslint-disable prettier/prettier */
// import React, { useState, useContext } from 'react';
// import { BluetoothContext } from '../../../../Global/BluetoothContext';
// import { useNavigation } from '@react-navigation/native';
// import AxisPad from '../../../lib/JoyStickLib/Joystick';
// import { View, TouchableOpacity, ImageBackground } from 'react-native';


// import robotControl from "../../assets/robotControl.png"

// const SensorAccelerometor = () => {
//     const navigation = useNavigation();

//     // State variables to hold joystick data
//     const [joystickData, setJoystickData] = useState(null);
//     const [stopData, setStopData] = useState(null);
//     const { connectedDevice } = useContext(BluetoothContext);

//     const handleJoystickMove = async (data) => {
//         let r = 60;
//         r = 2 * r / 3;
//         data.position.x -= r;
//         data.position.y -= r;

//         console.log(data);
//         setJoystickData(data)


//         //     try {
//         //         // Convert joystick data to a string
//         //         const finalDataBytes = [36, 84, 88, 44, joystickData.type.split("")[0], parseInt(joystickData.angle.degree) & 0xff, parseInt(joystickData.angle.degree) >> 8, parseInt(joystickData.force), parseInt(joystickData.position.x), parseInt(joystickData.position.y), 44, 69, 84, 88]; // Decimal numbers for $TX and ETX
//         //         const finalStopDataBytes = [36, 84, 88, 44, data.type.split("")[0], parseInt(data.angle.degree), parseInt(data.angle.degree), parseInt(data.force), parseInt(data.position.x), parseInt(data.position.y), 44, 69, 84, 88]; // Decimal numbers for $TX and ETX

//         //         console.log(finalDataBytes);
//         //         // Send data to Arduino


//         //         await RNBluetoothClassic.writeToDevice(connectedDevice?.address, finalDataBytes);

//         //         // Log the sent data for reference
//         //         console.log("Sent data to Arduino:", finalDataBytes);
//         //         console.log("Stop data :", finalStopDataBytes);
//         //     } catch (err) {
//         //         console.log(err);
//         //     }

//         //     // Update state with joystick data
//         //     setJoystickData(data);
//         //     setStopData(data)
//         // };

//         // const handleJoystickStop = async (data) => {


//         //     try {



//         //     }
//         //     catch (err) { console.log(err) }
//     }


//     return (
//         <ImageBackground source={robotControl} resizeMode='cover' style={styles.container}>
//             <View style={styles.joystickContainer}>
//                 <AxisPad color="#06b6d4" radius={60} onMove={handleJoystickMove} />
//             </View>

//         </ImageBackground>
//     );
// };

// const styles = {
//     container: {
//         flex: 1,
//         backgroundColor: '#303036',
//         justifyContent: 'space-evenly',
//         alignItems: 'center',
//         flexDirection: 'row'

//     },
//     joystickContainer: {
//         marginTop: 20,
//         padding: 10,

//     },



// };

// export default SensorAccelerometor;


import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import joystick from "../../assets/imgs/joystick.png"
import flatstick from "../../assets/imgs/keyboad.png"

const SensorAccelerometer = () => {

    const navigation = useNavigation();
    const handelKeybad = () => {
        navigation.navigate("Keybad control")
    }
    const handelJoyStick = () => {

        navigation.navigate("joystick control")
    }

    return (
        <View style={styles.container}>
            <View style={styles.ContainertextControlType}>
                <Text style={styles.textControlType}>Choose any Control type</Text>
            </View>
            <TouchableOpacity style={styles.cardStyle} onPress={handelKeybad}>
                <ImageBackground source={flatstick} style={styles.imgStyle} />
                <Text style={styles.textStyle}>Keybad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardStyle} onPress={handelJoyStick}>
                <ImageBackground source={joystick} style={styles.imgStyle} />
                <Text style={styles.textStyle}>Joystick</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SensorAccelerometer


const styles = StyleSheet.create({


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    textControlType: {

        fontWeight: 'bold',
        fontSize: 22,
        color: COLORS.primaryDarkGreyHex
    },
    joystickContainer: {
        marginTop: 20,
        padding: 10,

    },

    cardStyle: {
        backgroundColor: COLORS.primaryDarkGreyHex,
        borderRadius: 30,
        marginTop: 30,
        height: 75,
        position: 'relative',
        width: 220,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5

    },
    textStyle: {
        color: '#fff',
        fontSize: 20,
        marginRight: 10,
        fontFamily: 'Roboto',

    },
    imgStyle: { width: 70, height: 70 }
})