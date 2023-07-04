import React, { useState } from "react";
import { Box, Center, Image, Heading, Input, FormControl, VStack, Icon, Button, Checkbox, Text, HStack, WarningOutlineIcon, Slider, Switch, useColorMode } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth";
function SignIn() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [usuario, setUsuario] = useState<string>();
  const [senha, setSenha] = useState<string>();
  const { signIn } = useAuth()
  const navigation = useNavigation();
  const handleSignIn = async () => {
    signIn(usuario, senha)
  }

  return (
    <Center height="full" _dark={{ bg: "black", }} _light={{ bg: "white" }}>
   
      <VStack width={"full"} p="5">
        <Box width="full" >
          <Heading color={"coolGray.700"}
            _dark={{ color: "white" }}
            _light={{ color: "black" }}
          >
            Entrar
          </Heading>

          <FormControl isInvalid>
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
              Credenciais inválidas
            </FormControl.ErrorMessage>
          </FormControl>

          <Button mt={12} colorScheme={"purple"}
          onPress={handleSignIn}
          >Entrar</Button>

        </Box>

      </VStack>
      <HStack alignItems="center" space={4}>
        <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
        <Text>Realizar Cadastro </Text>
        </TouchableOpacity>
      </HStack>
      <HStack alignItems="center" space={4}>
        <Text>Dark</Text>
        <Switch isChecked={colorMode === 'light'}
          onToggle={toggleColorMode}
          aria-label={
            colorMode === 'light' ? 'troque para o tema escuro' : 'troque para o tema claro'
          }
        />
        <Text>Light</Text>

      </HStack>

    </Center>)
}

export default SignIn;
