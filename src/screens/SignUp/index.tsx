import React, { useState } from "react";
import { Box, Center, Image, Heading, Input, FormControl, Select, VStack, Icon, Button, Checkbox, Text, HStack, WarningOutlineIcon, Slider, Switch, useColorMode, CheckIcon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useAuth } from "../../context/auth";
function SignUp() {
  const { signUp } = useAuth()
  const { colorMode, toggleColorMode } = useColorMode();
  const [usuario, setUsuario] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const [confirmarSenha, setConfirmarSenha] = useState<string>();
  const [permissao, setPermissao] = React.useState<Permissao>("normal_user");
  const handleSignUp = () => {
    if (confirmarSenha != senha) {
      return Alert.alert("Erro", "As senhas não conferem");
    }
    if (senha.length < 6) {
      return Alert.alert("Erro", "A senha precisa ter no mínimo 6 caracteres");
    }
    signUp(usuario, senha, permissao);
    return


  }

  return (
    <Center height="full" _dark={{ bg: "black", }} _light={{ bg: "white" }}>

      <VStack width={"full"} p="5">
        <Box width="full" >
          <Heading color={"coolGray.700"}
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
          >
            Realizar Cadastro
          </Heading>

          <FormControl>
            <FormControl.Label>Usuário</FormControl.Label>
            <Input placeholder="seu usuario"
              onChangeText={setUsuario}

              InputLeftElement={
                <Icon as={<MaterialIcons name="person" />}
                  size={5}
                  ml={2}
                  color="muted.400"
                />
              }
            />
               <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Usuário inválido
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <FormControl.Label>Senha</FormControl.Label>
            <Input placeholder="sua senha"
              onChangeText={setSenha}
              secureTextEntry
              InputLeftElement={
                <Icon as={<MaterialIcons name="lock" />}
                  size={5}
                  ml={2}
                  color="muted.400"
                />
              }

            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Senha inválida
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.Label>Confirmar Senha</FormControl.Label>
            <Input placeholder=" senha"
              onChangeText={setConfirmarSenha}
              secureTextEntry
              InputLeftElement={
                <Icon as={<MaterialIcons name="lock" />}
                  size={5}
                  ml={2}
                  color="muted.400"
                />
              }

            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Erro ao confirmar senha
            </FormControl.ErrorMessage>
          </FormControl>

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
            onPress={handleSignUp}
          >Cadastrar</Button>

        </Box>

      </VStack>


    </Center>)
}

export default SignUp;
