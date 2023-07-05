import React, { useRef, useState } from "react";
import { Entypo } from '@expo/vector-icons';
import { Container, Icon, Name, Options, Option  } from "./styles";
import { Image } from "react-native";
import { useAuth } from "../../context/auth";
export const BookCard = ({data, onEdit, onRemove}) => {
    const {user} = useAuth();
    const { id, name, author, uri } = data;
    const ratio = {
        base: 3 / 4,
        md: 9 / 10
    };
  return (
    <Container>
    <Icon type={data.type}>
        <Image source={ {uri}} alt="image base"  style={{ width:"100%", height:"100%"}}/>
    </Icon>
  
    <Name>{name}</Name>
     {/* data.user.id == user.id  */}
    <Options>
      <Option onPress={onEdit}>
        <Entypo
          name="edit"
          color="#FEDC43"
          size={20}
        />
      </Option>

      <Option onPress={onRemove}>
        <Entypo
          name="trash"
          color="#EE3B45"
          size={20}
        />
      </Option> 
      <Option onPress={onRemove}>
        <Entypo
          name="check"
          color="#3ba3ee"
          size={20}
        />
      </Option>
    
    

      

    </Options>
  </Container>);
};
