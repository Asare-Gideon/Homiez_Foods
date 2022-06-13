import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { InitialParams } from '../types'
import Initial from '../screens/InitialScreen/Initial'
import Login from '../screens/LoginScreen/Login'
import Signup from '../screens/SignupScreen/Signup'

const Stack = createStackNavigator<InitialParams>()

const InitialStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="InitialScreen" >
            <Stack.Screen name='InitialScreen' component={Initial} />
            <Stack.Screen name='SignupScreen' component={Signup} />
            <Stack.Screen name='LoginScreen' component={Login} />
        </Stack.Navigator>
    )
}

export default InitialStack