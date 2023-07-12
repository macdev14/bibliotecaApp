import React from "react";
import { InputControllerProps } from "../../@types/inputController";
import { Controller } from "react-hook-form";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Error } from "./styles";
import {StyleSheet} from "react-native";
export const BottomSheetControlledInput = ({ control, name, error, ...rest }: InputControllerProps) => {
    return <>
    <Controller name={name}
       control={control}
       render={

           ({ field: { onChange, value } }) => (
            <BottomSheetTextInput
            style={styles.textInput}
            onChangeText={onChange}
            value={value}
          />
           )
       }
   />
   {/* {
       error && <Error>{error.message}</Error>
   } */}
   </>
};


const styles = StyleSheet.create({

    antDesign: {
      justifyContent: 'center',
      textAlign: "center",
      alignSelf: "stretch",
  
    },
  
    textInput: {
      alignSelf: "stretch",
      marginHorizontal: 0,
      marginBottom: 12,
      padding: 10,
      borderRadius: 5,
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      borderColor: "black",
      borderWidth: 2,
    },
  });