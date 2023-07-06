import React, { useEffect, useRef, useState } from "react";
import { FlatList, Alert, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { BookCard } from "../../components/BookCard";
import { database } from "../../databases";
import BookModel from "../../databases/models/bookModel";
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import { Form, FormTitle, Container, Input } from "./styles";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Text, Button, Icon, Select, CheckIcon } from "native-base";
import { useAuth } from "../../context/auth";
import { Q } from "@nozbe/watermelondb";
import ReservationModel from "../../databases/models/reservationModel";
import { useIsFocused } from "@react-navigation/native";
import UserModel from "../../databases/models/userModel";
import { hashPassword } from "../../utils/crypto";

export const Users = () => {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [users, setUsers] = useState([]);
  const [focusedUser, setFocusedUser] = useState<UserModel>({} as UserModel);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [permission, setPermission] = useState<Permissao>(user.permissions);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alterarSenha, setAlterarSenha] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  async function fetchData() {
  
    const allUsers = await database.collections
      .get<UserModel>('users')
      .query()
      .fetch();

    //const reservedBookIds = reservedBooks.map(reservation => reservation.bookId);

    //const userFilter = allUsers.filter(dbUser => dbUser.id =! user.id );

    setUsers(allUsers);

   }

   

    
  

  

   async function handleSave() {
    try {
      if (password.length < 6) {
        return Alert.alert("Erro", "A senha precisa ter no mínimo 6 caracteres");
      }
      if (confirmPassword!=password){
        Alert.alert("Erro", "As senhas não são iguais");
        return;
      }
    if(user.id)  {
   await database.write(async () => {
   
    const pw =  password.length > 0 ?  await hashPassword(password) : null
      await focusedUser.update(data=>{
        data.username = username;
        pw!==null ? data.password = pw : '';
        data.permissions = permission;
           
      })
   }).then(() =>  Alert.alert("Atualizado!"))
    } else{
      console.log(user.id);
    
    await database.write(async () => {
      await database.get<UserModel>('users')
      .create(data =>{
        data.username = username;
        data.password = password;
        data.permissions = permission;
      })
      
     }).then(() =>  Alert.alert("Adicionado!"));
    
  
   }
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
    bottomSheetRef.current?.expand();
   
  }



  async function handleRemove(item: UserModel) {
    await database.write(async () => {
      await item.destroyPermanently();
    });
    setFocusedUser({} as UserModel);
    fetchData();
    Alert.alert("Usuário excluído!");
  }
  
   useEffect(() => {
     fetchData()
   }, [isFocused]);
   

  return (
  

  <Container>
  <FlatList
  renderItem={({item})=><BookCard data={item}  onEdit={() => { handleEdit(item) }}
  onRemove={() => handleRemove(item) }
  />}
  data={users}
  
  /> 
   
   
        
     
 <BottomSheet
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

     
<Select borderColor="black" borderWidth="2" marginBottom={5} height={10} selectedValue={permission} minWidth="200" accessibilityLabel="Selecione o Nível de Acesso" placeholder="Selecione o Nível de Acesso" _selectedItem={{
       
       endIcon: <CheckIcon size="5" />
     }} mt={1} onValueChange={itemValue => setPermission(itemValue as Permissao)}>
         <Select.Item label="Usuário" value="normal_user"  />
         <Select.Item label="Administrador" value="super_user" />
     
       </Select>


          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Nova Senha"
            onChangeText={setPassword}
            value={password}
          />

          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Confirmar nova senha"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
       

{/* <Button colorScheme="primary" onPress={()=>setAlterarSenha(!alterarSenha)} >{ alterarSenha ? 'Cancelar' : 'Alterar Senha'  }</Button> */}
     
       

   
    

<Button colorScheme="success" onPress={handleSave} >Salvar</Button>
          </Form>
       
      </BottomSheet>
       
      </Container>
  )
  
};

const styles = StyleSheet.create({

  antDesign:{
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