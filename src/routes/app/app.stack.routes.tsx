import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Books } from "../../screens/Books";
import { Reservation } from "../../screens/Reservation";

const { Screen, Navigator } = createNativeStackNavigator()

export function BookStackRoutes(){
    return(
        <Navigator>
            <Screen name="Livros" component={Books} />
        </Navigator>
    )
}

export function ReservationStackRoutes(){
    return(
        <Navigator>
            <Screen name="Reservas" component={Reservation} />
        </Navigator>
    )
}