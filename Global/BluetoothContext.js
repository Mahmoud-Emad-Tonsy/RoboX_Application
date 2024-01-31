/* eslint-disable prettier/prettier */

// BluetoothContext.js
import React, { createContext, useState } from 'react';
const BluetoothContext = createContext();
const BluetoothProvider = ({ children }) => {
    const [available, setAvailable] = useState(null);
    const [pairedDevices, setPairedDevices] = useState([]);
    const [dataReceived, setDataReceived] = useState(null);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [isBluetoothEnable, setIsBluetoothEnable] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const [inputData, setInputData] = useState({
        input1: '',
        input2:
            [
                { label: 'Right', value: '' },
                { label: 'Left', value: '' },

            ],
        input3: '',
        input4:
            [
                { label: 'Right', value: '' },
                { label: 'Left', value: '' },

            ],
        input5: '',

    });
    const [inputDataRA, setInputDataRA] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',

    });

    return (
        <BluetoothContext.Provider value={{
            available, setAvailable, pairedDevices, setPairedDevices, dataReceived, setDataReceived, connectedDevice, setConnectedDevice, inputData, setInputData, isBluetoothEnable, setIsBluetoothEnable, inputDataRA, setInputDataRA
        }}>

            {children}
        </BluetoothContext.Provider>

    )
}
export { BluetoothContext, BluetoothProvider }