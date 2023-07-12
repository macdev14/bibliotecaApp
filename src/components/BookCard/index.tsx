import React, { useEffect, useState } from "react";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Container, Icon, Name, Options, Option } from "./styles";
import { Image } from "react-native";
import { useAuth } from "../../context/auth";
import UserModel from "../../databases/models/userModel";
import BookModel from "../../databases/models/bookModel";
import { fetchBook, fetchUser } from "../../services";
export const BookCard = ({ data, onEdit = null, onRemove = null, onReserve = null, onRemoveReserve = null }) => {
  const { user } = useAuth();
  const [userObject, setUserObject] = useState({} as UserModel);
  const [bookObject, setBookObject] = useState({} as BookModel);
  const { name, author, bookId, uri, userId, username, permissions } = data;
  useEffect(() => {
    userId && fetchUser(userId as string, setUserObject)
    bookId && fetchBook(bookId as string, setBookObject)
  }, [userId, bookId]);


  return (
    <Container>
      <Icon type={data.type}>
        {((bookObject && bookObject.uri) || uri) ? <Image source={{ uri: (uri || bookObject && bookObject.uri) }} alt="image base" style={{ width: "100%", height: "100%" }} /> :
          <AntDesign name="user" size={25} color="black" />
        }
      </Icon>

      <Name>{name || username || bookObject && bookObject.name}</Name>
      <Name>{author || bookObject && bookObject.author ? `Autor: ${author || bookObject && bookObject.author}` : ''} {permissions ? `Nível de Acesso ${permissions == 'normal_user' ? 'Usuário Normal' : 'Administrador'}` : ''}</Name>
      {data.reservationDate && userObject ? <Name>Reservado por: {userObject.username} em {data.reservationDate || ''}</Name> : ''}

      <Options>
        {((onEdit !== null && userId == user.id) || user.permissions == 'super_user') &&
          <Option onPress={onEdit}>
            <Entypo
              name="edit"
              color="#FEDC43"
              size={20}
            />
          </Option>}
        {((onRemove !== null && userObject.id == user.id) || user.permissions == 'super_user' )  &&
          <Option onPress={onRemove}>
            <Entypo
              name="trash"
              color="#EE3B45"
              size={20}
            />
          </Option>
        }
        {
          onReserve !== null ?
            <Option onPress={onReserve}>
              <Entypo
                name="check"
                color="#3ba3ee"
                size={20}
              />
            </Option> : ''
        }

        {
          onRemoveReserve !== null ?
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
