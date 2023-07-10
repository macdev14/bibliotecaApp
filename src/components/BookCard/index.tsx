import React, { useEffect, useRef, useState } from "react";
import { Entypo } from '@expo/vector-icons';
import { Container, Icon, Name, Options, Option  } from "./styles";
import { Alert, Image } from "react-native";
import { useAuth } from "../../context/auth";
import { Heading, VStack } from "native-base";
import UserModel from "../../databases/models/userModel";
import { database } from "../../databases";
import { Q } from "@nozbe/watermelondb";
import BookModel from "../../databases/models/bookModel";
import { fetchBook, fetchUser } from "../../services";
export const BookCard = ({data, onEdit=null, onRemove=null, onReserve=null, onRemoveReserve=null }) => {
    const {user} = useAuth();
    const [userObject, setUserObject] = useState({} as UserModel);
    const [bookObject, setBookObject] = useState({} as BookModel);
    const { name, author, bookId, uri, userId, username , permissions } = data;
      useEffect(() => {
          userId && fetchUser(userId as string, setUserObject)
          bookId && fetchBook(bookId as string, setBookObject)
      }, [userId, bookId]);
    

  return (
    <Container>
    <Icon type={data.type}>
        <Image source={ {uri: (uri || bookObject && bookObject.uri)}  } alt="image base"  style={{ width:"100%", height:"100%"}}/>
    </Icon>
   
       <Name>{name || username || bookObject && bookObject.name }</Name>
    <Name>{author || bookObject && bookObject.author ?  `Autor: ${author || bookObject && bookObject.author}` : '' } {permissions ? `Nível de Acesso ${permissions == 'normal_user' ? 'Usuário Normal' : 'Administrador'}`   : ''}</Name>
    {data.reservationDate && <Name>Reservado por: {userObject.username} em {data.reservationDate || '' }</Name> }
 
    <Options>
      { onEdit !==null && ( data.users!=undefined ? data.users.id == user.id : true ) ?
      <Option onPress={onEdit}>
        <Entypo
          name="edit"
          color="#FEDC43"
          size={20}
        />
      </Option>: ''}
        { onRemove !== null  && ( data.users!=undefined ? data.users.id == user.id : true ) ?
      <Option onPress={onRemove}>
        <Entypo
          name="trash"
          color="#EE3B45"
          size={20}
        />
      </Option>  : ''
      }
      {
       onReserve!==null ? 
      <Option onPress={onReserve}>
        <Entypo
          name="check"
          color="#3ba3ee"
          size={20}
        />
      </Option> : ''
      }

{
       onRemoveReserve!==null ? 
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
