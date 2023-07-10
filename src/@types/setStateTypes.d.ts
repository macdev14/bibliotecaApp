import BookModel from "../databases/models/bookModel"
import ReservationModel from "../databases/models/reservationModel"
import UserModel from "../databases/models/userModel"

type NominalSetState = React.Dispatch<React.SetStateAction<TState>> &
  { readonly __brand_setState__: unique symbol }


type UserSetState = React.Dispatch<React.SetStateAction<UserModel>> &
  { readonly __brand_setState__: unique symbol }

type BookSetState = React.Dispatch<React.SetStateAction<BookModel>> &
  { readonly __brand_setState__: unique symbol }


type UsersSetState = React.Dispatch<React.SetStateAction<UserModel[]>> &
  { readonly __brand_setState__: unique symbol }

type BooksSetState = React.Dispatch<React.SetStateAction<BookModel[]>> &
  { readonly __brand_setState__: unique symbol }

type ReservationsSetState = React.Dispatch<React.SetStateAction<ReservationModel[]>> &
  { readonly __brand_setState__: unique symbol }

type ReservationSetState = React.Dispatch<React.SetStateAction<ReservationModel>> &
  { readonly __brand_setState__: unique symbol }
