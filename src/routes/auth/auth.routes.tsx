import React from "react";

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";

const { Screen, Navigator } = createNativeStackNavigator()

export function AuthStackRoutes(){
    return(
        <Navigator>
            <Screen name="SignIn" component={SignIn} />
            <Screen name="SignUp" component={SignUp} />
        </Navigator>
    )
}