import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { useAuth } from "../../context/auth";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
export default function DrawerContent(props) {
  const { signOut, user } = useAuth();
  const hello = "Olá, " + user.username
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={hello} onPress={() => { }}
        icon={({ focused, color, size }) => (
          <AntDesign name="user" size={size} color="black" />
        )}
        labelStyle={styles.helloStyle}
      />
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={() => signOut()}
        icon={({ focused, color, size }) => (
          <Ionicons name="log-out-outline" size={size} color="red" />
        )}
        labelStyle={styles.labelStyle}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',

  },
  helloStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',

  },
});