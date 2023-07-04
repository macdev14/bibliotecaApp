import React from "react";
import {MaterialIcons} from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookStackRoutes, ReservationStackRoutes } from "./app.stack.routes";

const {Screen, Navigator} = createBottomTabNavigator()

export function TabRoutes() {
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
            <Screen name="BookStackRoutes" component={BookStackRoutes}
            options={
                {
                    tabBarLabel: "Livros Disponíveis",
                    tabBarIcon: ({color}) => (
                        <MaterialIcons name="book" color={color} size={25} />
                                        )
                }
            }
            
            />
            <Screen name="ReservationStackRoutes" component={ReservationStackRoutes} 
           options={
            {
                tabBarLabel: "Livros Reservados",
                tabBarIcon: ({color}) => (
                    <MaterialIcons name="bookmark" color={color} size={25} />
                                    )
            }
        }
        
            />
        </Navigator>
    )
}