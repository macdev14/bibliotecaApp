import React, { useState } from "react";
import { Box, Center, Image, Heading, Input, FormControl, VStack, Icon, Button, Checkbox, Text, HStack, WarningOutlineIcon, Slider, Switch, useColorMode } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { ControlledInput } from "../../components/ControlledInput";

type FormData = {
  username: string;
  password: string;

}


const schema = yup.object({
  username: yup.string().required("Informe seu usuario"),
  password: yup.string().min(6, "A senha deve ter ao menos 6 dígitos").required("Informe sua senha")
})

function SignIn() {

  const { control, handleSubmit, formState : {errors}} =  useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const { signIn } = useAuth()
  const navigation = useNavigation();
  const handleSignIn = (data : FormData) => {
      signIn(data.username, data.password)
  }


  
 

  return (
    <Center height="full" _dark={{ bg: "black", }} _light={{ bg: "white" }}>
         <Heading color={"coolGray.700"} mb="10"
        
          >
            Entrar
          </Heading>
      <VStack width={"full"} p="5">
        <Box width="full" >
         

          <ControlledInput
        icon="user"
        placeholder="Usuário"
        name="username"
        control={control}
        error={errors.username}
       
      />

      <ControlledInput
              control={control}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              error={errors.password}
            />
        
          
      

          <Button mt={12} colorScheme={"green"}
          onPress={handleSubmit(handleSignIn)}
          >Entrar</Button>

        </Box>

      </VStack>
      <HStack alignItems="center" space={4}>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text>Não possui conta? </Text>
        </TouchableOpacity>
      </HStack>
    

    </Center>)
}

export default SignIn;
