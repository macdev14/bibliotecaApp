import React, { useState } from "react";
import { Box, Center, Image, Heading, Input, FormControl, Select, VStack, Icon, Button, Checkbox, Text, HStack, WarningOutlineIcon, Slider, Switch, useColorMode, CheckIcon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../context/auth";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { ControlledInput } from "../../components/ControlledInput";
import { useNavigation } from "@react-navigation/native";

type FormData = {
  username: string;
  password: string;
  password_confirm: string

}
const schema = yup.object({
  username: yup.string().required("Informe o seu usuario"),
  password: yup.string().min(6, "A senha deve ter ao menos 6 dígitos").required("Informe a senha"),
  password_confirm: yup.string().oneOf([yup.ref('password')], 'A senha de confirmação não confere.').required("Informe a senha de confirmação")
})

function SignUp() {
  const navigation = useNavigation();
  const { signUp } = useAuth()
  const [permissao, setPermissao] = React.useState<Permissao>("normal_user");

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const handleSignUp = (data : FormData) => {
    signUp(data.username, data.password, permissao).then(() => {Alert.alert("Usuário cadastrado com sucesso, realize o login!");navigation.navigate('SignIn')}).catch((e) =>Alert.alert(e.message)); 
  }

  return (
    <Center height="full" _light={{ bg: "white" }}>
       
       <Heading color={"coolGray.700"} mb="10" >
            Realizar Cadastro
          </Heading>
      <VStack width={"full"} p="5">
        <Box width="full" >
         

          <ControlledInput
            control={control}
            error={errors.username}
            name="username"
            icon="user"
            placeholder="Usuario"
            
          />

          <ControlledInput
            control={control}
            name="password"
            icon="lock"
            placeholder="Senha"
            secureTextEntry
            error={errors.password}
          />

          <ControlledInput
            control={control}
            name="password_confirm"
            icon="lock"
            placeholder="Confirme sua Senha"
            secureTextEntry
            error={errors.password_confirm}
          />

          <FormControl isRequired marginTop={5}>
            <Select selectedValue={permissao} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
              bg: "gray.300",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => setPermissao(itemValue as Permissao)}>
              <Select.Item label="Usuário" value="normal_user" />

              <Select.Item label="Administrador" value="super_user" />
            </Select>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              Selecione uma permissão!
            </FormControl.ErrorMessage>
          </FormControl>


          <Button mt={12} colorScheme={"purple"}
            onPress={handleSubmit(handleSignUp)}
          >Cadastrar-se</Button>

        </Box>

      </VStack>
      <HStack alignItems="center" space={4}>
        <TouchableOpacity onPress={()=>navigation.navigate('SignIn')}>
        <Text>Possui conta? </Text>
        </TouchableOpacity>
      </HStack>

    </Center>)
}

export default SignUp;
