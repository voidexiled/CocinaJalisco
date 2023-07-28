import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import { VStack, Box, Divider, Heading, Input, Icon } from "native-base";
import { Feather, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "./styles";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";

const { primary, secondary, tertiary, background, text, accent, textLight } =
  Colors;
const SearchBar = ({ ...props }) => {
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <VStack
      my="1"
      ml="20"
      space={5}
      w="100%"
      maxW={rW(300)}
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }
    >
      <VStack w="100%" space={3} alignSelf="center">
        <Input
          placeholder="Buscar"
          placeholderTextColor="gray.700"
          variant="unstyled"
          width="100%"
          borderRadius="12"
          borderColor={primary}
          borderWidth={1}
          py="2"
          px="4"
          {...props}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          focusOutlineColor="blue.400"
          InputLeftElement={
            <Icon
              ml="4"
              size="4"
              color={isFocus ? "blue.400" : primary}
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
};

export default SearchBar;
