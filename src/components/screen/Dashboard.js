/* eslint-disable prettier/prettier */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import robotImage from "../assets/robot.png"
import motorImage from "../assets/motor.png"
import Landing from "../assets/newLanding.png"
const Dashboard = () => {
    const navigation = useNavigation();

    const handleCardRobotPress = () => {
        navigation.navigate('IntelligentRobot');
    };
    const handleCardMotorPress = () => {
        navigation.navigate('MotorStudy');
    };

    return (
        <SafeAreaView style={styles.continer}>
            <TouchableOpacity onPress={handleCardRobotPress}>


                <View
                    style={styles.cardStyle}
                >
                    <Text style={styles.textStyle}>Robot Arm Module</Text>
                    <ImageBackground source={robotImage} resizeMode="cover" style={styles.image} />
                </View>

            </TouchableOpacity>
            <TouchableOpacity onPress={handleCardMotorPress}>
                <View
                    style={styles.cardStyle}
                >
                    <Text style={styles.textStyle}>Motor Study Module</Text>
                    <ImageBackground source={motorImage} resizeMode="cover" style={styles.image} />

                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Dashboard;


const styles = StyleSheet.create({

    continer: {
        flex: 1,
        backgroundColor: '#000000'


    },

    cardStyle: {
        backgroundColor: '#22A39F',
        // padding: 20,
        borderRadius: 10,
        margin: 10,
        height: 100,
        position: 'relative'
    },
    textStyle: { color: 'white', fontSize: 18, opacity: 1, position: 'absolute', zIndex: 5, padding: 10 },
    image: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        // padding: 40,
        borderRadius: 15,
        opacity: 0.5,
        height: 100,
        padding: 15


    }
})
//  opacity: 1, position: 'absolute', zIndex: 5, padding: 10