/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastProvider } from 'react-native-toast-notifications'

// Start All Screens Sidebar
import Devices from './DrawerScreens/Devices';
import Dashboard from './DrawerScreens/Dashboard';
import BluetoothDashboard from './DrawerScreens/BluetoothDashboard';
import Info from './DrawerScreens/Info';
// End All Screens Sidebar

// Start All Stack_Screens Sidebar
import IntelligentRobot from '../Stack/IntelligentRobot';
import MotorStudy from '../Stack/MotorStudy';
import SensorAccelerometor from "../Stack/SensorAccelerometer";
import ScanBluetooth from "../Stack/ScanBluetooth";
// End All Stack_Screens Sidebar


import { BluetoothProvider } from '../../../../Global/BluetoothContext';
import { COLORS } from '../../../theme/theme';
import KeybadScreen from '../Stack/KeybadScreen';
import JoystickScreen from '../Stack/JoystickScreen';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const generateDrawerIcon = (name, color, stylePd) => ({ focused, size }) => (
    <Icon name={name} size={size} color={color} style={{ padding: stylePd }} />
)
const MainDrawer = () => {

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return (
        <BluetoothProvider>
            <ToastProvider>
                <NavigationContainer >
                    <Stack.Navigator screenOptions={{ headerShown: false, headerStyle: styles.HaederBg, headerTintColor: COLORS.primaryWhiteHex }}  >
                        <Stack.Screen name="MainDashboard"
                            options={{
                                headerStyle: styles.HaederBg,
                                headerTintColor: COLORS.primaryWhiteHex,
                            }}>
                            {() => (
                                <Drawer.Navigator
                                    screenOptions={styles.sidebarStyle}
                                >
                                    <Drawer.Screen
                                        name="Bluetooth Dashboard"
                                        component={BluetoothDashboard}
                                        options={{
                                            headerStyle: styles.HaederBg,
                                            headerTintColor: COLORS.primaryWhiteHex,
                                            drawerIcon: generateDrawerIcon('bluetooth-b', COLORS.primaryLightGreenHex, 2)
                                        }} />
                                    <Drawer.Screen
                                        name="Dashboard"
                                        component={Dashboard} options={{
                                            headerStyle: styles.HaederBg, headerTintColor: COLORS.primaryWhiteHex,
                                            drawerIcon: generateDrawerIcon('home', COLORS.primaryLightGreenHex)
                                        }} />
                                    <Drawer.Screen name="Devices" component={Devices} options={{
                                        headerStyle: styles.HaederBg, headerTintColor: COLORS.primaryWhiteHex,
                                        drawerIcon: generateDrawerIcon('tablet', COLORS.primaryLightGreenHex, 4)
                                    }} />

                                    <Drawer.Screen name="Info" component={Info} options={{
                                        headerStyle: styles.HaederBg, headerTintColor: COLORS.primaryWhiteHex,
                                        drawerIcon: generateDrawerIcon('info', COLORS.primaryLightGreenHex, 6)
                                    }} />
                                </Drawer.Navigator>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Intelligent Robot" component={IntelligentRobot} options={{ headerShown: true, cardStyleInterpolator: forFade }} />
                        <Stack.Screen name="Motor Study" component={MotorStudy} options={{ headerShown: true, cardStyleInterpolator: forFade }} />
                        <Stack.Screen name="Sensor Accelerometor" component={SensorAccelerometor} options={{ headerShown: true, cardStyleInterpolator: forFade }} />
                        <Stack.Screen name="Scan Bluetooth" component={ScanBluetooth} options={{ headerShown: true, cardStyleInterpolator: forFade }} />
                        <Stack.Screen name="Keybad control" component={KeybadScreen} options={{ headerShown: true, cardStyleInterpolator: forFade }} />
                        <Stack.Screen name="joystick control" component={JoystickScreen} options={{ headerShown: true, cardStyleInterpolator: forFade }} />


                    </Stack.Navigator>
                </NavigationContainer>
            </ToastProvider>

        </BluetoothProvider>



    );
};

export default MainDrawer;


const styles = StyleSheet.create({

    sidebarStyle: {

        drawerStyle: {
            backgroundColor: '#272727',
            width: 230,
        },
        drawerLabelStyle: {
            color: 'white',

        },


    },
    HaederBg: {
        backgroundColor: COLORS.primaryDarkGreyHex
    }

})