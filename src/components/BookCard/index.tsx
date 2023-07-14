import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Container, Icon, Name, Options, Option } from "./styles";
import { GestureResponderEvent, Image } from "react-native";
import { useAuth } from "../../context/auth";
import UserModel from "../../databases/models/userModel";
import BookModel from "../../databases/models/bookModel";
import { fetchBook, fetchUser } from "../../services";
import ReservationModel from "../../databases/models/reservationModel";

interface BookCardProps {
  data : BookModel | ReservationModel | UserModel;
  onEdit? :  undefined | (()=>Promise<void>) ;
  onRemove? :  undefined | (()=>Promise<void>);
  onReserve? :   undefined | (()=>Promise<void>);
  onRemoveReserve? :  undefined | (()=>Promise<void>);
}


export const BookCard = ({ data, onEdit=undefined, onRemove=undefined, onReserve=undefined, onRemoveReserve=undefined } : BookCardProps) => {
  const { user } = useAuth();
  const [userObject, setUserObject] = useState({} as UserModel);
  const [bookObject, setBookObject] = useState({} as BookModel);
  // const { name, author, bookId, uri, userId, username, permissions } = data;
  const isReservation = data instanceof ReservationModel;
  const isBook = data instanceof BookModel;
  const isUser = data instanceof UserModel;


  useEffect(() => {
    if(isReservation){
      data.userId && fetchUser(data.userId as string, setUserObject)
      data.bookId && fetchBook(data.bookId as string, setBookObject)
    }

    if(isBook){
      data.userId && fetchUser(data.userId as string, setUserObject)
    }
  }, [[isBook && data.userId], [isReservation && data.bookId]  ]);


  return (
    <Container>
      <Icon type=''>
        {(bookObject.uri || isBook) ? <Image source={{ uri: (isBook && data.uri || bookObject && bookObject.uri) }} alt="image base" style={{ width: "100%", height: "100%" }} /> :
          <AntDesign name="user" size={25} color="black" />
        }
      </Icon>

      <Name>{isBook && data.name || isUser && data.username || bookObject && bookObject.name}</Name>
      <Name>{ isBook && data.author || bookObject && bookObject.author ? `Autor: ${isBook && data.author || bookObject && bookObject.author}` : ''} { isUser ? `Nível de Acesso ${data.permissions == 'normal_user' ? 'Usuário Normal' : 'Administrador'}` : ''}</Name>
      { isReservation && data.reservationDate && userObject ? <Name>Reservado por: {userObject.username} em {data.reservationDate || ''}</Name> : ''}

      <Options>
        { ((onEdit !== null && onEdit !== undefined && userObject.id == user.id) || user.permissions == 'super_user' ) &&
          <Option onPress={onEdit}>
            <Entypo
              name="edit"
              color="#FEDC43"
              size={20}
            />
          </Option>}
        {((onRemove !== null && onRemove !== undefined && userObject.id == user.id) || user.permissions == 'super_user' )  &&
          <Option onPress={onRemove}>
            <Entypo
              name="trash"
              color="#EE3B45"
              size={20}
            />
          </Option>
        }
        {
          onReserve !== null && onReserve !== undefined ?
            <Option onPress={onReserve}>
              <Entypo
                name="check"
                color="#3ba3ee"
                size={20}
              />
            </Option> : ''
        }

        {
            onRemoveReserve !== null && onRemoveReserve !== undefined ?
            <Option onPress={onRemoveReserve}>
              <Entypo
                name="circle-with-cross"
                color="#c71919"
                size={20}
              />
            </Option> : ''
        }





      </Options>
    </Container>);
};
