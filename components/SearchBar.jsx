import { Text, View } from "react-native";
import React, { Component } from "react";
import { VStack, Box, Divider, Heading, Input, Icon } from "native-base";
import { Feather, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
const SearchBar = ({ ...props }) => {
  return (
    <VStack
      my="0"
      space={5}
      w="100%"
      maxW="300px"
      divider={
        <Box px="2">
          <Divider />
        </Box>
      }
    >
      <VStack w="100%" space={3} alignSelf="center">
        <Input
          placeholder="Buscar"
          placeholderTextColor="gray.500"
          variant="unstyled"
          width="100%"
          borderRadius="10"
          borderColor="gray.500"
          borderWidth={1}
          py="2"
          px="4"
          {...props}
          InputLeftElement={
            <Icon
              ml="4"
              size="4"
              color="gray.500"
              as={<Ionicons name="ios-search" />}
            />
          }
        />
      </VStack>
    </VStack>
  );
};

export default SearchBar;
