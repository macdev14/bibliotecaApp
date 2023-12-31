import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Books } from "../../screens/Books";
import { Reservations } from "../../screens/Reservations";
const { Screen, Navigator } = createNativeStackNavigator()
import {MaterialIcons} from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler";
import { AdminReservations } from "../../screens/AdminReservations";
import { MenuIcon } from "../../components/StackMenuIcon";



export function BookStackRoutes(){
    return(
        <Navigator  screenOptions={({ navigation }) => ({
            headerLeft: () => (
                <MenuIcon navigation={navigation}/>  
            ),
          })}>
            <Screen name="Livros" component={Books} />
        </Navigator>
    )
}

export function ReservationStackRoutes(){
    return(
        <Navigator
        screenOptions={({ navigation }) => ({
            headerLeft: () => (
                <MenuIcon navigation={navigation}/>  
            ),
          })}
        >
            <Screen name="Reservas" component={Reservations} />
        </Navigator>
    )
}

