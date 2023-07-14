import React from "react";
import { InputControllerProps } from "../../@types/inputController";
import { Controller } from "react-hook-form";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Error } from "./styles";
export const BottomSheetControlledInput = ({ control, name, error, ...rest }: InputControllerProps) => {
    return <>
    <Controller name={name}
       control={control}
       render={

           ({ field: { onChange, value } }) => (
            <BottomSheetTextInput
           
            onChangeText={onChange}
            value={value}
            {...rest}
          />
           )
       }
   />
   {
       error && <Error>{error.message}</Error>
   }
   </>
};
