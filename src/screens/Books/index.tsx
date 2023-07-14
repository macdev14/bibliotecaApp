import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FlatList, Alert, StyleSheet } from "react-native";
import { BookCard } from "../../components/BookCard";
import { database } from "../../databases";
import BookModel from "../../databases/models/bookModel";
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Form, FormTitle, Container } from "./styles";

import { Button } from "native-base";
import { useAuth } from "../../context/auth";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Q } from "@nozbe/watermelondb";
import ReservationModel from "../../databases/models/reservationModel";
import { useIsFocused } from "@react-navigation/native";
import { BottomSheetControlledInput } from "../../components/BottomSheetControlledInput";

type bookDataProps = {
  author: string,
  name: string,
  uri: string,
}

export const Books = () => {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [books, setBooks] = useState<BookModel[]>([]);
  const [book, setBook] = useState<BookModel>({} as BookModel);
  const bottomSheetRef = useRef<BottomSheet>({} as BottomSheet);

  const schema = yup.object({
    name: yup.string().required("Informe o nome do livro"),
    author: yup.string().required("Informe o autor do livro"),
    uri: yup.string().required("Informe o link da imagem do livro").url('Link inválido'),
  });

  const { setValue, control, handleSubmit, formState : {errors}} =  useForm({
    resolver: yupResolver(schema)
  })


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

    setBooks(availableBooks as SetStateAction<never[]>);

  }

  async function handleSave(bookData: bookDataProps) {
    try {
      if (book.id) {
        await database.write(async () => {
          await book.update(data => {
            data.name = bookData.name;
            data.author = bookData.author;
            data.uri = bookData.uri;
          })
        })
        Alert.alert("Alterado!");
      } else {

        await database.write(async () => {
          await database.get<BookModel>('books')
            .create(data => {
              data.name = bookData.name;
              data.author = bookData.author;
              data.uri = bookData.uri;
              data.users.id = user.id
            })

        });
        Alert.alert("Adicionado!");

      }
      bottomSheetRef.current?.collapse();
      cleanAll();
      
      fetchData();
    }
    catch (error) {
      console.log(error);
    }

  }

  const cleanAll = () => {
  
    setBook({} as BookModel);
    setValue('name','');
    setValue('uri','');
    setValue('author','');
  }

  async function handleEdit(item: BookModel) {
    setBook(item);
    setValue('name', item.name);
    setValue('author', item.author);
    setValue('uri', item.uri);
    bottomSheetRef.current?.expand();
  }

  async function handleReserve(item: BookModel) {
    const currentDate = new Date();
    await database.write(async () => {
      await database.get<ReservationModel>('reservations')
        .create(data => {
          data.book.id = item.id;
          data.users.id = user.id
          data.reservationDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
        })

    });
    Alert.alert("Livro Reservado!");
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

  return (


    <Container>
      <FlatList
        renderItem={({ item }) => (
        <BookCard data={item} onEdit={()=>handleEdit(item)}
          onRemove={()=>handleRemove(item)}
          onReserve={()=>handleReserve(item)}
        />
  )}
        data={books }

      />
      <BottomSheet
        onChange={(e) => e == 0 && cleanAll()}
        ref={bottomSheetRef}
        index={books.length > 0 ? 0 : 1}
        snapPoints={['5%', '65%']}
      >
        <Form>
          <FormTitle>{book.name ? 'Alterar' : 'Adicionar'}</FormTitle>

          <BottomSheetControlledInput
            control={control}
            style={styles.textInput}
            placeholder="Título"
            name="name"
            error={errors.name}
          />

          <BottomSheetControlledInput
            control={control}
            style={styles.textInput}
            placeholder="Autor"
            name="author"
            error={errors.author}
            
          />

          <BottomSheetControlledInput
            control={control}
            style={styles.textInput}
            placeholder="Link da capa do livro"
            name="uri"
            error={errors.uri}
          />





          <Button colorScheme="success" onPress={handleSubmit(handleSave)} >Salvar</Button>
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
    textAlignVertical: "center",
  },
});