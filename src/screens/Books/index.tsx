import React from "react";
import { FlatList, Text } from "react-native";
import { BookCard } from "../../components/BookCard";
export const Books = () => {
  return <FlatList
  renderItem={()=><BookCard/>}
  data={[1,2,3,4,5,6,7,8,9]}
  numColumns={2}
  /> 
  
};
