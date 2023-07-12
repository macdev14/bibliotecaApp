import React, { useEffect, useRef, useState } from "react";
import { FlatList, Alert, StyleSheet, AlertButton } from "react-native";
import { BookCard } from "../../components/BookCard";
import { database } from "../../databases";
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Form, FormTitle, Container, Input } from "./styles";
import { Button, Select, CheckIcon } from "native-base";
import { useAuth } from "../../context/auth";
import { useIsFocused } from "@react-navigation/native";
import UserModel from "../../databases/models/userModel";
import { hashPassword } from "../../utils/crypto";
import { fetchUsers, deleteUser } from "../../services";




export const Users = () => {
  const { user, signOut } = useAuth();
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [focusedUser, setFocusedUser] = useState<UserModel>({} as UserModel);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [permission, setPermission] = useState<Permissao>('normal_user');
  const [confirmPassword, setConfirmPassword] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);

  const cleanAll = () => {
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setPermission('normal_user');
    setFocusedUser({} as UserModel);
  }
  const opcoes: AlertButton[] = [
    {
      text: 'Cancelar',
      onPress: () => '',

    },
    { text: 'Confirmar', style: 'cancel', onPress: () => handleSave().then(() => signOut()) },
  ]




  const handleUserSave = () => {
    focusedUser.permissions !== permission && user.id === focusedUser.id ? Alert.alert("Mudança de Nível de Acesso",
      "Será necessário fazer login novamente ao alterar o nível de acesso.",
      opcoes
    ) : handleSave();
  }



  async function fetchData() {
    await fetchUsers(setUsers);
  }


  async function handleSave() {
    try {
      if (password) {
        if (password.length < 6) {
          return Alert.alert("Erro", "A senha precisa ter no mínimo 6 caracteres");
        }
        if (confirmPassword != password) {
          Alert.alert("Erro", "As senhas não são iguais");
          return;
        }
      }
      if (focusedUser.id) {

        await database.write(async () => {

          const pw = password.length > 0 ? await hashPassword(password) : null
          await focusedUser.update(data => {
            data.username = username;
            pw !== null ? data.password = pw : '';
            data.permissions = permission;

          })
        }).then(() => Alert.alert("Atualizado!"))
      } else {
        console.log("Permission:", permission);
        const pw = password.length > 0 ? await hashPassword(password) : null
        await database.write(async () => {
          await database.get<UserModel>('users')
            .create(data => {
              data.username = username;
              data.password = pw;
              data.permissions = permission;
            })

        }).then(() => Alert.alert("Adicionado!")).catch((e) => Alert.alert(e.message));



      }
      cleanAll();
      bottomSheetRef.current?.collapse();
      fetchData();
    }
    catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(item: UserModel) {
    setFocusedUser(item);
    setUsername(item.username);
    setPermission(item.permissions);
    bottomSheetRef.current?.expand();

  }



  async function handleRemove(item: UserModel) {
    if (item.id == user.id) {
      const opcoesUsuarioAtual: AlertButton[] = [
        {
          text: 'Cancelar',
          onPress: () => '',

        },
        { text: 'Confirmar', style: 'cancel', onPress: () => deleteUser(item.id).then(() => signOut()) },
      ]
      return Alert.alert("Atenção", "Ao Excluir o usuário atual, sua sessão será encerrada!", opcoesUsuarioAtual);
    }

    const opcoesUsuario: AlertButton[] = [
      {
        text: 'Cancelar',
        onPress: () => '',

      },
      { text: 'Confirmar', style: 'cancel', onPress: () => deleteUser(item.id).then(() => { setFocusedUser({} as UserModel); fetchData() }).catch(e => console.log(e)) },
    ]
    Alert.alert("Atenção", "Ao excluir o usuário, seus livros e reservas serão apagados!", opcoesUsuario);

    return fetchData();


  }

  useEffect(() => {
    fetchData()
  }, [isFocused]);


  return (


    <Container>
      <FlatList
        renderItem={({ item }) => <BookCard data={item} onEdit={() => { handleEdit(item) }}
          onRemove={() => handleRemove(item)}
        />}
        data={users}

      />




      <BottomSheet
        onChange={(e) => e == 0 && cleanAll()}
        ref={bottomSheetRef}
        index={0}
        snapPoints={['4%', '75%']}
      >
        <Form>
          <FormTitle>{focusedUser.username ? 'Alterar' : 'Adicionar'}</FormTitle>

          <BottomSheetTextInput

            style={styles.textInput}
            placeholder="Usuário"
            onChangeText={setUsername}
            value={username}
          />


          <Select borderColor="black" borderWidth="2" marginBottom={5} textAlign="center" fontSize="15" height={10} selectedValue={permission} minWidth="200" accessibilityLabel="Selecione o Nível de Acesso" placeholder="Selecione o Nível de Acesso" _selectedItem={{

            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={itemValue => setPermission(itemValue as Permissao)}>
            <Select.Item label="Usuário" value="normal_user" />
            <Select.Item label="Administrador" value="super_user" />

          </Select>


          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Nova Senha"
            onChangeText={setPassword}
            secureTextEntry
            value={password}
          />

          <BottomSheetTextInput
            secureTextEntry
            style={styles.textInput}
            placeholder="Confirmar nova senha"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />

          <Button colorScheme="success" onPress={handleUserSave} >Salvar</Button>
        </Form>

      </BottomSheet>

    </Container>
  )

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

