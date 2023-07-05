import React from "react";
import { Box, AspectRatio, Center, Image, Heading, Input, FormControl, Stack, VStack, Icon, Button, Checkbox, Text, HStack, WarningOutlineIcon, Slider, Switch, useColorMode } from "native-base";
import {MaterialIcons} from "@expo/vector-icons"
export const BookDetails = () => {
    const ratio = {
        base: 3 / 4,
        md: 9 / 10
    };
  return (<Box
    shadow="2"
    rounded="lg"
    w={150}
    h={150}
    margin={4}
    mb="10"
    _light={{ bg: "coolGray.50" }}
    _dark={{ bg: "gray.700" }}
  >
    <AspectRatio w="100%" ratio={ratio}>
      <Image source={ {uri: "https://images3.alphacoders.com/823/82317.jpg"}} alt="image base" />
    </AspectRatio>
    <Text bold position="absolute" color="coolGray.50" top="0" m="4">
     
      <MaterialIcons name="book" color="white" size={25} />
      
       
   
    </Text>
    <Stack space="2" p="4">
      <Text color="gray.400">July 3, 2023</Text>
      <Heading size={["md", "lg", "md"]} fontWeight="medium">
        The Garden City
      </Heading>
     
    </Stack>
    <HStack space="3" px="4">
    <MaterialIcons name="book" color="red" size={25} />
      <Text _light={{ color : "emerald.800" }} _dark={{ color : "emerald.300" }}>
        Find out more
      </Text>
    </HStack>
  </Box>);
};
