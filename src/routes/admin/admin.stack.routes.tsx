import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { Books } from "../../screens/Books";
import { Reservations } from "../../screens/Reservations";
const { Screen, Navigator } = createNativeStackNavigator()
import {MaterialIcons} from "@expo/vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler";
import { MenuIcon } from "../../components/StackMenuIcon";
import { AdminReservations } from "../../screens/AdminReservations";
import { Users } from "../../screens/Users";

export function AdminStackReservationRoutes(){
    return(
        <Navigator
        screenOptions={({ navigation }) => ({
            headerLeft: () => (
                <MenuIcon navigation={navigation}/>  
            ),
          })}
        >
            <Screen name="Admin" component={AdminReservations} />
        </Navigator>
    )
}

export function AdminUserManageRoutes(){
    return(
        <Navigator
        screenOptions={({ navigation }) => ({
            headerLeft: () => (
                <MenuIcon navigation={navigation}/>  
            ),
          })}
        >
            <Screen name="Usuarios" component={Users} />
        </Navigator>
    )
}

function useRoute() {
    throw new Error("Function not implemented.");
}
function useAuth(): { user: any; } {
    throw new Error("Function not implemented.");
}

