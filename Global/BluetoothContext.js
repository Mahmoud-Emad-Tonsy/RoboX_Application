/* eslint-disable prettier/prettier */

// BluetoothContext.js
import React, { createContext, useState } from 'react';

const BluetoothContext = createContext();
const BluetoothProvider = ({ children }) => {
    const [available, setAvailable] = useState(null);
    const [pairedDevices, setPairedDevices] = useState([]);
    const [dataReceived, setDataReceived] = useState(null);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [inputData, setInputData] = useState({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
    });

    return (
        <BluetoothContext.Provider value={{

            available, setAvailable, pairedDevices, setPairedDevices, dataReceived, setDataReceived, connectedDevice, setConnectedDevice, inputData, setInputData
        }}>

            {children}
        </BluetoothContext.Provider>

    )
}
export { BluetoothContext, BluetoothProvider }