import React from "react";
import { Control, Controller, FieldError } from 'react-hook-form';
import { Input, InputProps } from "../Input";
import { Feather } from '@expo/vector-icons';
import { Error } from "./styles";
import { Text } from "react-native";
import { InputControllerProps } from "../../@types/inputController";


export function ControlledInput({ control, name, icon, error, ...rest }: InputControllerProps) {
   return <>
     <Controller name={name}
        control={control}
        render={

            ({ field: { onChange, value } }) => (
                <Input icon={icon} {...rest} onChangeText={onChange} value={value} />
            )
        }
    />
    {
        error && <Error>{error.message}</Error>
    }
    </>
}