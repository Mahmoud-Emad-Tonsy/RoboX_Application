/* eslint-disable prettier/prettier */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import robotImage from "../../../assets/imgs/robot-dashboard.png"
import motorImage from "../../../assets/imgs/motor2.png"
import sensor from "../../../assets/imgs/motorDashboard.png"
import { COLORS } from '../../../../theme/theme';
const Dashboard = () => {


    const navigation = useNavigation();

    const handleCardRobotPress = () => {
        navigation.navigate('Intelligent Robot');
    };
    const handleCardMotorPress = () => {
        navigation.navigate('Motor Study');
    };
    const handleCardSensorAccelerometorPress = () => {
        navigation.navigate('Sensor Accelerometor');
    };

    return (
        <SafeAreaView style={styles.continer}>
            <TouchableOpacity onPress={handleCardRobotPress}>
                <View style={styles.cardStyle}>
                    <Image source={robotImage} resizeMode="cover" style={styles.image} />
                    <Text style={[styles.textStyle, styles.textWithShadow]}>Robot Arm Module</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCardMotorPress}>
                <View style={styles.cardStyle}>
                    <Image source={motorImage} resizeMode="cover" style={[styles.image, { width: 130 }]} />
                    <Text style={[styles.textStyle, styles.textWithShadow]}>Motor Study Module</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCardSensorAccelerometorPress}>
                <View style={styles.cardStyle}>
                    <Image source={sensor} resizeMode="cover" style={[styles.image, { width: 140 }]} />
                    <Text style={[styles.textStyle, styles.textWithShadow]}>Sensor Accelerometor</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Dashboard;


const styles = StyleSheet.create({

    continer: {
        flex: 1,


    },

    cardStyle: {

        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: 30,
        marginTop: 30,
        height: 75,
        position: 'relative',
        width: 330,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    },
    textStyle: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        left: 130,
        fontWeight: 'bold',
        fontFamily: 'Roboto',


    },
    image: {

        width: 160,
        height: 110,
        marginBottom: 30,
        position: 'absolute',
        left: -26,
        bottom: -37,


    },
    textWithShadow: {
        textShadowColor: '#FFF',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 10
    }

})
