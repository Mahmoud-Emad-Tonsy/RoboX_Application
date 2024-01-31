/* eslint-disable prettier/prettier */

import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { COLORS } from '../../../theme/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import robotControl from "../../assets/imgs/robotControl.png"

export default function KeybadScreen() {
    const handleButtonPress = (angle) => {
        console.log(`Button at ${angle} degrees pressed`);
    };

    return (
        <ImageBackground source={robotControl} style={[styles.container]}>
            <View style={styles.manualContainer}>

                <TouchableOpacity onPress={() => handleButtonPress(180)} style={styles.arrowLeft}>
                    <View>
                        <Icon name={'arrow-left'} size={20} color={COLORS.primaryBlackHex} />
                    </View>
                </TouchableOpacity>
                <View style={styles.center}>
                    <TouchableOpacity onPress={() => handleButtonPress(90)} style={styles.arrowUp}>
                        <Icon name={'arrow-up'} size={20} color={COLORS.primaryBlackHex} />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(270)} style={styles.arrowDown}>
                        <Icon name={'arrow-down'} size={20} color={COLORS.primaryBlackHex} />

                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleButtonPress(0)} style={styles.arrowRight}>
                    <Icon name={'arrow-right'} size={20} color={COLORS.primaryBlackHex} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress(60)} style={[styles.arrowUp2, { transform: [{ rotate: '130deg' }] }]}>
                    <Icon name={'arrow-left'} size={20} color={COLORS.primaryBlackHex} />
                </TouchableOpacity>
                <View style={styles.center}>
                    <TouchableOpacity onPress={() => handleButtonPress(300)} style={[styles.arrowDown2, { transform: [{ rotate: '130deg' }] }]}>
                        <Icon name={'arrow-up'} size={20} color={COLORS.primaryBlackHex} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(120)} style={[styles.arrowLeft2, { transform: [{ rotate: '130deg' }] }]}>
                        <Icon name={'arrow-down'} size={20} color={COLORS.primaryBlackHex} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => handleButtonPress(240)} style={[styles.arrowRight2, { transform: [{ rotate: '130deg' }] }]}>
                    <Icon name={'arrow-right'} size={20} color={COLORS.primaryBlackHex} />
                </TouchableOpacity>

            </View>
        </ImageBackground>

    )
}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        // backgroundColor: '#303036',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',


    },
    manualContainer: {
        width: 150,
        height: 150,
        // backgroundColor: 'green',
        borderRadius: 20

    },


    arrowUp: {
        backgroundColor: "#06b6d4",
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        left: 55,






    },
    arrowDown: {
        backgroundColor: "#06b6d4",
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        left: 55,
        top: 115



    },
    arrowRight: {
        backgroundColor: "#06b6d4",
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        right: 0,
        top: 55

    },
    arrowLeft: {
        backgroundColor: "#06b6d4",
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        left: 0,
        top: 55
    },



    arrowUp2: {
        backgroundColor: COLORS.primaryRedHex,
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        right: 7,
        top: 7
    },
    arrowDown2: {
        backgroundColor: COLORS.primaryRedHex,
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        top: 105,
        right: 7


    },
    arrowLeft2: {
        backgroundColor: COLORS.primaryRedHex,
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        left: 7,
        top: 7

    },
    arrowRight2: {
        backgroundColor: COLORS.primaryRedHex,
        padding: 7,
        borderRadius: 50,
        textAlign: 'center',
        width: 35,
        height: 35,
        position: 'absolute',
        top: 105,
        left: 7

    },
})