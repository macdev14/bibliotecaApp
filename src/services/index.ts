import { Q } from "@nozbe/watermelondb";
import { Alert } from "react-native";
import { database } from "../databases";
import BookModel from "../databases/models/bookModel";
import UserModel from "../databases/models/userModel";
import { BookSetState, BooksSetState, ReservationSetState, ReservationsSetState, UserSetState, UsersSetState } from "../@types/setStateTypes";
import ReservationModel from "../databases/models/reservationModel";
import { Dispatch, SetStateAction } from "react";

// Obter dados de Usuario
export const fetchUser = async (userId : string, setUserObject : Dispatch<SetStateAction<UserModel>> ) => await database.collections
.get<UserModel>('users')
.query(Q.where('id', userId))
.fetch()
.then(data=> setUserObject(data[0]))
.catch(()=> Alert.alert("Não foi possível obter dados do usuário!"));

// Obter dados de Usuarios
export const fetchUsers = async (setUsersObjects: Dispatch<SetStateAction<UserModel[]>>  ) => await database.collections
.get<UserModel>('users')
.query()
.fetch()
.then(data=> setUsersObjects(data))
.catch(()=> Alert.alert("Não foi possível obter dados dos usuários!"));

// Obter dados de Livro
export const fetchBook = async (bookId : string, setBookObject: Dispatch<SetStateAction<BookModel>>  ) => await database.collections
.get<BookModel>('books')
.query(Q.where('id', bookId))
.fetch()
.then(data=> setBookObject(data[0]))
.catch(()=> Alert.alert("Não foi possível obter dados do livro!"));


// Obter dados de Livros
export const fetchBooks = async (setBooksObjects: Dispatch<SetStateAction<BookModel[]>>  ) => await database.collections
.get<BookModel>('books')
.query()
.fetch()
.then(data=> setBooksObjects(data))
.catch(()=> Alert.alert("Não foi possível obter dados dos livros!"));

export const fetchBooksFromUserId = async (userId: string, setBooksObjects: Dispatch<SetStateAction<BookModel[]>>  ) => await database.collections
.get<BookModel>('books')
.query(Q.where('user_id', userId))
.fetch()
.then(data=> setBooksObjects(data))
.catch(()=> Alert.alert("Não foi possível obter dados dos livros do usuário!"));



// Obter dados de Reserva
export const fetchReservation = async (reservationId : string, setReservationObject: Dispatch<SetStateAction<ReservationModel>>  ) => await database.collections
.get<ReservationModel>('reservations')
.query(Q.where('id', reservationId))
.fetch()
.then(data=> setReservationObject(data[0]))
.catch(()=> Alert.alert("Não foi possível obter dados da reserva!"));

// Obter dados das Reservas
export const fetchReservations = async (setReservationsObjects: Dispatch<SetStateAction<ReservationModel[]>>  ) => await database.collections
.get<ReservationModel>('reservations')
.query()
.fetch()
.then(data=> setReservationsObjects(data))
.catch(()=> Alert.alert("Não foi possível obter dados das reservas!"));


export async function fetchBooksInReservationFromUserId(userId:string, setBooks : Dispatch<SetStateAction<BookModel[]>>) {
    const userReservations = await database.collections
        .get<ReservationModel>('reservations')
        .query(Q.where('user_id', userId))
        .fetch();

      // Get the book IDs from the reservations
      const reservedBookIds = userReservations.map(reservation => reservation.bookId);
      // Fetch the reserved books
      const reservedBooks = await database.collections
        .get<BookModel>('books')
        .query(Q.where('id', Q.oneOf(reservedBookIds)))
        .fetch();
      setBooks(reservedBooks);
      
   }

export async function fetchAvailableBooks(setBooks : Dispatch<SetStateAction<BookModel[]>>) {

    const reservedBooks = await database.collections
      .get<ReservationModel>('reservations')
      .query()
      .fetch();

    const reservedBookIds = reservedBooks.map(reservation => reservation.bookId);

    const allBooks = await database.collections
      .get<BookModel>('books')
      .query()
      .fetch();

    const availableBooks = allBooks.filter(book => !reservedBookIds.includes(book.id));

    setBooks(availableBooks);

   }

   export async function fetchAvailableBooksIncludeSelectedBook(reservedBookId:string, setBooks : Dispatch<SetStateAction<BookModel[]>>) {

    const reservedBooks = await database.collections
      .get<ReservationModel>('reservations')
      .query()
      .fetch();

    const reservedBookIds = reservedBooks.map(reservation => {return reservation.bookId != reservedBookId ? reservation.bookId : null });
    console.log("book ids: ", reservedBookIds)
    const allBooks = await database.collections
      .get<BookModel>('books')
      .query()
      .fetch();

    const availableBooks = allBooks.filter(book => !reservedBookIds.includes(book.id) );
    console.log("Available books: ",availableBooks);
    setBooks(availableBooks);

   }



   export async function fetchAvailableBooksForUser(userId:string, setBooks : Dispatch<SetStateAction<BookModel[]>>) {

    const reservedBooks = await database.collections
      .get<ReservationModel>('reservations')
      .query(Q.where('user_id', userId))
      .fetch();

    const reservedBookIds = reservedBooks.map(reservation => reservation.bookId);

    const allBooks = await database.collections
      .get<BookModel>('books')
      .query()
      .fetch();

    const availableBooks = allBooks.filter(book => !reservedBookIds.includes(book.id));

    setBooks(availableBooks);

   }




