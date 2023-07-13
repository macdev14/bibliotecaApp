import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Text, StyleSheet } from "react-native";
import ReservationModel from "../../databases/models/reservationModel";
import { database } from "../../databases";
import { Q } from "@nozbe/watermelondb";
import { useAuth } from "../../context/auth";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Button } from "native-base";
import { BookCard } from "../../components/BookCard";
import BookModel from "../../databases/models/bookModel";
import { Form, FormTitle, Container } from "../Books/styles";
import { useIsFocused } from "@react-navigation/native";
import { fetchBooksInReservationFromUserId } from "../../services";

export const Reservations = () => {
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState<BookModel>({} as BookModel);
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [uri, setUri] = useState('');
  const bottomSheetRef = useRef<BottomSheet>({} as BottomSheet);




  useEffect(() => {
    fetchBooksInReservationFromUserId(user.id, setBooks);
  }, [isFocused]);

  async function removeReserve(item: BookModel) {
    await database.write(async () => {
      await database.get<ReservationModel>('reservations')
        .query(Q.where('book_id', item.id)).destroyAllPermanently();
    });
    await fetchBooksInReservationFromUserId(user.id, setBooks);

  }

  return (


    <Container>
      <FlatList
        renderItem={({ item }) => <BookCard data={item}
          onRemoveReserve={() => removeReserve(item)}

        />}
        data={books}

      />



      {/* <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={['4%', '65%']}
      >
      

         
    

       
      </BottomSheet> */}

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


