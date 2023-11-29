/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


// Start All Screens Sidebar
import Devices from '../screen/Devices';
import Dashboard from '../screen/Dashboard';
import Info from '../screen/Info';
// End All Screens Sidebar

// Start All Stack_Screens Sidebar
import IntelligentRobot from '../IntelligentRobot';
import MotorStudy from '../MotorStudy';
// End All Stack_Screens Sidebar

import { BluetoothProvider } from '../../../Global/BluetoothContext';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const MainDrawer = () => {

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    return (
        <BluetoothProvider>
            <NavigationContainer >
                <Stack.Navigator screenOptions={{ headerShown: false }}  >
                    <Stack.Screen name="MainDashboard" options={{

                    }}>
                        {() => (
                            <Drawer.Navigator

                                screenOptions={styles.sidebarStyle}


                            >
                                <Drawer.Screen name="Devices" component={Devices} />
                                <Drawer.Screen name="Dashboard" component={Dashboard} />
                                <Drawer.Screen name="Info" component={Info} />
                            </Drawer.Navigator>
                        )}

                    </Stack.Screen>


                    <Stack.Screen name="IntelligentRobot" component={IntelligentRobot} options={{ headerShown: true, cardStyleInterpolator: forFade }} />
                    <Stack.Screen name="MotorStudy" component={MotorStudy} options={{ headerShown: true, cardStyleInterpolator: forFade }} />



                </Stack.Navigator>
            </NavigationContainer>

        </BluetoothProvider>



    );
};

export default MainDrawer;


const styles = StyleSheet.create({

    sidebarStyle: {
        drawerStyle: {
            backgroundColor: '#272727',
            width: 230
        },
        drawerLabelStyle: {
            color: 'white',
        },

    },

})