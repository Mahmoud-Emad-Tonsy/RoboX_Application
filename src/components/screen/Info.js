/* eslint-disable prettier/prettier */

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,

} from 'react-native';
import React from 'react'

const Info = () => {
    return (

        <View>
            <Text>Info</Text>
        </View>

    )
}


export default Info

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
        borderWidth: 6,
        borderColor: "red",
    },
});