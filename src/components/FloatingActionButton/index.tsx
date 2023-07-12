import { Box, Fab, Icon } from "native-base";
import React from "react";
import { AntDesign } from "@expo/vector-icons"
const FloatingActionButton = ({action}) => {
    return <Box>
        <Fab onPress={action} size="sm" icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />} />
      </Box>;
  };

export default FloatingActionButton;