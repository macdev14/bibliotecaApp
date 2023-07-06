import React, { useEffect, useRef, useState } from "react";
import { FlatList, Alert, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { BookCard } from "../../components/BookCard";
import { database } from "../../databases";
import BookModel from "../../databases/models/bookModel";
import BottomSheet, {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import { Form, FormTitle, Container, Input } from "./styles";
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { Text, Button, Icon } from "native-base";
import { useAuth } from "../../context/auth";
import { Q } from "@nozbe/watermelondb";
import ReservationModel from "../../databases/models/reservationModel";
import { useIsFocused } from "@react-navigation/native";

export const AdminReservations = () => {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState<BookModel>({} as BookModel);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [uri, setUri] = useState('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  async function fetchData() {
    
    const reservedBooks = await database.collections
      .get<ReservationModel>('reservations')
      .query()
      .fetch();

    const reservedBookIds = reservedBooks.map(reservation => reservation.bookId);

    const allBooks = await database.collections
      .get('books')
      .query()
      .fetch();

    const availableBooks = allBooks.filter(book => !reservedBookIds.includes(book.id));


    setBooks(availableBooks);
   }

   async function handleSave() {
    try {
    if(book.id)  {
   await database.write(async () => {
      await book.update(data=>{
        data.name = name;
        data.author = author;
        data.uri = uri;      
      })
   })
    } else{
      console.log(user.id);
    // const userDb = await database.get('users').query(Q.where('id', user.id));
    
    await database.write(async () => {
      await database.get<BookModel>('books')
      .create(data =>{
        data.name = name;
        data.author = author;
        data.uri = uri;
        data.users.id = user.id
      })
      
     });
     Alert.alert("Created!");
  
   }
   bottomSheetRef.current?.collapse();
   fetchData();
  }
  catch (error) {
  console.log(error);    
  }
   }

   async function handleEdit(item: BookModel) {
    setName(item.name);
    setBook(item);
    setUri(item.uri);
    setAuthor(item.author);
    bottomSheetRef.current?.expand();
   
  }

  async function handleReserve(item: BookModel) {
    await database.write(async () => {
      await database.get<ReservationModel>('reservations')
      .create(data =>{
        data.book.id = item.id;
        data.users.id = user.id
      })
      
     });
    Alert.alert("Reserved!");
    fetchData();
  }

  async function removeReserve(item: BookModel) {
    await database.write(async () => {
      await database.get<ReservationModel>('reservations')
      .query(Q.where('books_id', item.id)).destroyAllPermanently();
     });
    bottomSheetRef.current?.expand();
   
  }

  async function handleRemove(item: BookModel) {
    await database.write(async () => {
      await item.destroyPermanently();
    });
    setBook({} as BookModel);
    fetchData();
    Alert.alert("Deleted!");
  }
  
   useEffect(() => {
     fetchData()
   }, [isFocused]);
   
   console.log(book)

  return (
  

  <Container>
  <FlatList
  renderItem={({item})=><BookCard data={item}  onEdit={() => { handleEdit(item) }}
  onRemove={() => handleRemove(item) }
  onReserve={() => handleReserve(item)}
  />}
  data={books}
  
  /> 
   
        
     
 <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['4%', '65%']}
      >
       <Form> 
          <FormTitle>{book.name ? 'Alterar' : 'Adicionar'}</FormTitle>

          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Título"
            onChangeText={setName}
            value={name}
          />

          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Autor"
            onChangeText={setAuthor}
            value={author}
          />

          <BottomSheetTextInput
            style={styles.textInput}
            placeholder="Link da capa do livro"
            onChangeText={setUri}
            value={uri}
          />
          

   
    

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