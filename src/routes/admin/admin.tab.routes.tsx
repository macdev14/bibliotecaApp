import React from "react";
import {FontAwesome5, Feather} from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AdminStackReservationRoutes, AdminUserManageRoutes } from "./admin.stack.routes";

const {Screen, Navigator} = createBottomTabNavigator()

export function AdminTabRoutes() {

    return(
        <Navigator
        screenOptions={
            {
                tabBarActiveTintColor:"red",
                tabBarInactiveTintColor:'gray',
                headerShown:false,
            }
        }
        >
            <Screen name="AdminReservation" component={AdminStackReservationRoutes}
            options={
                {
                    tabBarLabel: "Reservas de Usuários",
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="address-book" size={24} color="red" />
                                        )
                }
            }
            
            />
            <Screen name="AdminUsers" component={AdminUserManageRoutes} 
           options={
            {
                tabBarLabel: "Usuários Cadastrados",
                tabBarIcon: ({color}) => (
                    <Feather name="user" size={25} color="red" />
                                    )
            }
        }
        
            />
        </Navigator>
    )
}