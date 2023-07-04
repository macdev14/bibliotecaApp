import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {MaterialIcons} from '@expo/vector-icons'
import { TabRoutes } from "./app.tab.routes";
const {Screen, Navigator} = createDrawerNavigator()

export function DrawerRoutes() {
    return(
        <Navigator
        screenOptions={{  headerShown:false}}
        >
            <Screen name="TabRoutes" component={TabRoutes}
            options={
                {
                    drawerLabel: "Home",
                    drawerIcon: () => (
                        <MaterialIcons name="home" size={22} />
                    )
                }
            }
            
            />
            {/* <Screen name="screenB" component={ScreenB} options={
                {
                    drawerLabel: "Sair",
                    drawerIcon: () => (
                        <MaterialIcons name="logout" size={22} />
                    )
                }
            }
           
            /> */}
        </Navigator>
    )
}