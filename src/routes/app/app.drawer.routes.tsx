import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {Feather, MaterialIcons} from '@expo/vector-icons'
import { TabRoutes } from "./app.tab.routes";
import DrawerContent from "../../components/DrawerContent";
import { AdminTabRoutes } from "../admin/admin.tab.routes";
import { useAuth } from "../../context/auth";

const {Screen, Navigator} = createDrawerNavigator()



export function DrawerRoutes() {
    const { user } = useAuth();
    return(
        <Navigator initialRouteName={user.permissions === "normal_user" ? "TabRoutes" : "AdminReservationStackRoutes"}
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
            { user.permissions === "super_user" &&
            <Screen name="AdminReservationStackRoutes" component={AdminTabRoutes}
            options={
                {
                    drawerLabel: "Administrativo",
                    drawerIcon: () => (
                        <MaterialIcons name="admin-panel-settings" size={24} color="#ee6161" />
                    )
                }
            } /> }
        </Navigator>
    )
}