import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {MaterialIcons} from '@expo/vector-icons'
import { TabRoutes } from "./app.tab.routes";
import DrawerContent from "../../components/DrawerContent";
const {Screen, Navigator} = createDrawerNavigator()



export function DrawerRoutes() {
    return(
        <Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{  headerShown:false}}
        >
            <Screen name="TabRoutes" component={TabRoutes}
            options={
                {
                    drawerLabel: "Livros",
                    drawerIcon: () => (
                        <MaterialIcons name="home" size={22} />
                    )
                }
            }
            
            />
        </Navigator>
    )
}