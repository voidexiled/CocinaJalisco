import React, { memo } from "react";
import { VStack, HStack, Input, Icon, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";

import { Colors, Dark } from "./styles";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";

const { primary, secondary, tertiary, background, text, accent, textLight } =
  Colors;

const SearchBar = ({ haveFilter, ...props }) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack
      justifyContent={"center"}
      //my="1"
      //ml="20"
      //space={5}
      w={"90%"}
    >
      <HStack w="100%" alignSelf="center" justifyContent={"center"}>
        <Input
          fontSize={rW("18")}
          selectionColor={primary}
          variant="unstyled"
          w="60%"
          placeholder="Buscar"
          placeholderTextColor={colorMode === "dark" ? textLight : "gray.400"}
          borderColor={primary}
          borderWidth={1}
          borderRadius={10}
          focusOutlineColor="blue.400"
          //py="2"
          //px="4"
          {...props}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          InputLeftElement={
            <Icon
              ml="4"
              size="4"
              color={isFocus ? "blue.400" : primary}
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </HStack>
    </VStack>
  );
};

export default memo(SearchBar);
