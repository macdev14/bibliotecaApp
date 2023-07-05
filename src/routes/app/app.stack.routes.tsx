import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Books } from "../../screens/Books";
import { Reservations } from "../../screens/Reservations";
import StackHeader from "../../components/StackHeader";
const { Screen, Navigator } = createNativeStackNavigator()
import {MaterialIcons} from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler";

export function BookStackRoutes(){
    return(
        <Navigator  screenOptions={({ navigation }) => ({
            headerLeft: () => (
                <TouchableOpacity  onPress={() => navigation.toggleDrawer()}>
                        <MaterialIcons name="menu" color="black" size={25} />
                </TouchableOpacity>
            
              
            ),
          })}>
            <Screen name="Livros" component={Books} />
        </Navigator>
    )
}

export function ReservationStackRoutes(){
    return(
        <Navigator>
            <Screen name="Reservas" component={Reservations} />
        </Navigator>
    )
}