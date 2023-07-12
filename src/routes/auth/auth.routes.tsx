import React from "react";

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";

const { Screen, Navigator } = createNativeStackNavigator()

export function AuthStackRoutes(){
    return(
        <Navigator initialRouteName="SignIn" screenOptions={{headerBackVisible: false}} >
            <Screen options={{ title: 'Entrar' }} name="SignIn" component={SignIn} />
            <Screen options={{ title: 'Cadastrar' }} name="SignUp" component={SignUp} />
        </Navigator>
    )
}