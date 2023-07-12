import React, { useEffect, useRef, useState } from "react";
import { FlatList, Alert, StyleSheet } from "react-native";
import { BookCard } from "../../components/BookCard";
import { database } from "../../databases";
import BookModel from "../../databases/models/bookModel";
import BottomSheet from '@gorhom/bottom-sheet';
import { Form, FormTitle, Container } from "./styles";
import { Button, CheckIcon, Select } from "native-base";
import { useAuth } from "../../context/auth";
import ReservationModel from "../../databases/models/reservationModel";
import { useIsFocused } from "@react-navigation/native";
import { fetchAvailableBooksForUser, fetchAvailableBooksIncludeSelectedBook, fetchUsers } from "../../services";
import UserModel from "../../databases/models/userModel";

export const AdminReservations = () => {
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const [reservations, setReservations] = useState<ReservationModel[]>([]);
  const [reservation, setReservation] = useState<ReservationModel>({} as ReservationModel);
  const [book, setBook] = useState<BookModel>({} as BookModel);
  const [allBooks, setAllBooks] = useState<BookModel[]>([]);
  const [availableBooks, setAvailableBooks] = useState<BookModel[]>([] as BookModel[]);
  const [allUsers, setAllUsers] = useState<UserModel[]>([] as UserModel[]);

  const [selectedBook, setSelectedBook] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const bottomSheetRef = useRef<BottomSheet>(null);
  async function fetchData() {
    const reservedBooks = await database.collections
      .get<ReservationModel>('reservations')
      .query()
      .fetch();

    setReservations(reservedBooks);
    
    fetchAvailableBooksIncludeSelectedBook(selectedBook, setAvailableBooks);
    fetchUsers(setAllUsers);
  }

  async function handleSave() {
    try {
      if (reservation.id) {
        await database.write(async () => {
          await reservation.update(data => {
            data.userId = selectedUser;
            data.bookId = selectedBook;
          })
        }).then(() => Alert.alert("Reserva atualizada!")).catch(() => Alert.alert("Não foi possível atualizar reserva!"));

      } else {
        const currentDate = new Date();

        await database.write(async () => {
          await database.get<ReservationModel>('reservations')
            .create(data => {
              data.userId = selectedUser;
              data.bookId = selectedBook;
              data.reservationDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
            })
        }).then(() => Alert.alert("Reserva cadastrada!")).catch(() => Alert.alert("Não foi possível cadastrar reserva!"));



      }
      bottomSheetRef.current?.collapse();
      setReservation({} as ReservationModel);
      cleanAll();
      fetchData();
    }
    catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(item: ReservationModel) {
    setReservation(item);
    console.log("Item: ", item);
    setSelectedBook(item.bookId);
    setSelectedUser(item.userId);
    console.log("book id: ", item.bookId);
    fetchAvailableBooksIncludeSelectedBook(item.bookId, setAvailableBooks).then(() => bottomSheetRef.current?.expand());




  }

  async function handleReserve(item: ReservationModel) {
    await database.write(async () => {
      await database.get<ReservationModel>('reservations')
        .create(data => {
          data.book.id = item.id;
          data.users.id = user.id
        })

    });
    Alert.alert("Reservado!");
    fetchData();
  }


  async function handleRemove(item: ReservationModel) {
    await database.write(async () => {
      await item.destroyPermanently();
    });
    setReservation({} as ReservationModel);
    fetchData();
    Alert.alert("Reserva Excluída!");
  }

  const cleanAll = () => {
    console.log("cleanAll");
    setReservation({} as ReservationModel); 
    setSelectedBook(''); 
    setSelectedUser('');
    setAvailableBooks([]);
  }

  useEffect(() => {
    fetchData()
  }, [isFocused]);

  console.log(reservation)

  return (


    <Container>

      <FlatList
        renderItem={({ item }) => <BookCard data={item} onEdit={() => { handleEdit(item) }}
          onRemove={() => handleRemove(item)}
        // onReserve={() => handleReserve(item)}
        />}
        data={reservations}

      />



      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['4%', '65%']}
        onChange={(e) => e == 0 && cleanAll()}
      >
        <Form>
          <FormTitle>{reservation.id ? 'Alterar' : 'Adicionar'}</FormTitle>


          <Select borderColor="black" borderWidth="2" marginBottom={5} height={10} selectedValue={selectedUser} minWidth="200" accessibilityLabel="Selecione o Usuário" placeholder="Selecione o Usuário" _selectedItem={{

            endIcon: <CheckIcon size="5" />
          }} mt={1} onValueChange={(value) => { fetchAvailableBooksForUser(value, setAvailableBooks); setSelectedUser(value) }}  >
            {allUsers.map((user) => <Select.Item label={user.username} value={user.id} key={user.id} />)}



          </Select>

          <Select borderColor="black" borderWidth="2" marginBottom={5} height={10} selectedValue={selectedBook} minWidth="200" accessibilityLabel="Selecione o Livro" placeholder="Selecione o Livro"
            onValueChange={(value) => { setSelectedBook(value) }}
            _selectedItem={{

              endIcon: <CheckIcon size="5" />
            }} mt={1}  >

            {availableBooks.map((book) => <Select.Item label={book.name} value={book.id} key={book.id} />)}

          </Select>

          <Button mb="5" colorScheme="success" onPress={handleSave} >Salvar</Button>

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