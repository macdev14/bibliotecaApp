import React, { useRef, useState } from "react";
import { Entypo } from '@expo/vector-icons';
import { Container, Icon, Name, Options, Option  } from "./styles";
import { Image } from "react-native";
import { useAuth } from "../../context/auth";
import { Heading, VStack } from "native-base";
export const BookCard = ({data, onEdit=null, onRemove=null, onReserve=null, onRemoveReserve=null }) => {
    const {user} = useAuth();
    const { id, name, author, uri, userId, username , permissions } = data;

  return (
    <Container>
    <Icon type={data.type}>
        <Image source={ {uri}} alt="image base"  style={{ width:"100%", height:"100%"}}/>
    </Icon>
   
       <Name>{name || username}</Name>
    <Name>{author ?  `Autor: ${author}` : '' } {permissions ? `Nível de Acesso ${permissions == 'normal_user' ? 'Usuário Normal' : 'Administrador'}`   : ''}</Name>
    
 
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
