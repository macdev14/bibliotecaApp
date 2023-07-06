import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Feather, MaterialIcons} from '@expo/vector-icons'
import { TabRoutes } from "./app.tab.routes";
import DrawerContent from "../../components/DrawerContent";
import { AdminTabRoutes } from "../admin/admin.tab.routes";

const {Screen, Navigator} = createDrawerNavigator()



export function DrawerRoutes() {
    return(
        <Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{  headerShown:false,  drawerActiveBackgroundColor: '#FEE0E0', drawerActiveTintColor:'black' }}
        >
            <Screen name="TabRoutes" component={TabRoutes}
            options={
                {
                    drawerLabel: "Livros",
                    drawerIcon: () => (
                        <Feather name="book" size={24} color="#ee6161" />
                    )
                }
            }
            
            />

            <Screen name="AdminReservationStackRoutes" component={AdminTabRoutes}
            options={
                {
                    drawerLabel: "Administrativo",
                    drawerIcon: () => (
                        <MaterialIcons name="admin-panel-settings" size={24} color="#ee6161" />
                    )
                }
            } />
        </Navigator>
    )
}