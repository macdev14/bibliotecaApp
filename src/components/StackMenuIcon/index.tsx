import { TouchableOpacity } from "react-native-gesture-handler";
import {MaterialIcons} from "@expo/vector-icons"
export const MenuIcon = ({navigation}) => {
    return (
      <TouchableOpacity  onPress={() => navigation.toggleDrawer()}>
      <MaterialIcons name="menu" color="black" size={25} />
  </TouchableOpacity>
    )
  };
  