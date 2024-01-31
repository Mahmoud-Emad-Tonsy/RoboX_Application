/* eslint-disable prettier/prettier */

import React, { useEffect } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image, ImageBackground } from "react-native"
import BluetoothImg from "../../assets/imgs/blueIcon.webp"
import BluetoothBgGray from "../../assets/imgs/grayCiurcal.png"
import LoadingDots from "react-native-loading-dots";
import { useNavigation } from '@react-navigation/native';



const ScanBluetooth = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {

            navigation.navigate("Devices")

        }, 3000)


    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BluetoothBgGray} style={styles.containerImg} resizeMode="cover">
                <View style={styles.ViewStyle}>
                    <Image source={BluetoothImg} style={styles.ImgStyle} resizeMode='cover' />
                </View>
            </ImageBackground>
            <View >
                <Text style={styles.text}>Scanning For Your Devices</Text>
            </View>
            <View style={styles.dotsWrapper}>
                <LoadingDots />
            </View>

        </SafeAreaView>
    )
}


export default ScanBluetooth



const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: '#303036',
        alignItems: 'center',
        justifyContent: 'center'

    },
    dotsWrapper: {
        width: 100,
        marginTop: 50

    },
    containerImg: {
        padding: 10,
        width: 260,
        height: 260,
        alignItems: 'center',
        justifyContent: 'center',


    },
    ViewStyle: {

        backgroundColor: '',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'gray',
        borderRadius: 100,
        width: 210,
        height: 210,
        justifyContent: 'center',
        alignItems: 'center',


    },

    ImgStyle: {

        width: 110,
        height: 190,
        objectFit: 'cover',
        // width: '60%',
        // height: '100%'
    },
    text: {
        fontWeight: '800',
        color: '#fff',
        marginTop: 30,
    }
})


{/**     */ }