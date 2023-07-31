import { View } from "react-native";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
import React, { Component, memo, useState } from "react";

import { VStack, Select, Icon, Text, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles";
const QtySelect = () => {
  return (
    <VStack minW={"25%"} maxW={"25%"} h={"100%"}>
      <Box>
        <Text bold ml={rW(6)} fontSize={rH(14)} color={"#fff"}>
          Cantidad
        </Text>
      </Box>
      <Select
        fontWeight={"bold"}
        placeholder="0"
        pl="6"
        w={"100%"}
        h={"75%"}
        color={"#fff"}
        borderColor={"#fff"}
        placeholderTextColor={"#fff"}
        fontSize={rH(16)}
        rounded={"full"}
        _selectedItem={{
          color: "white",
          bg: "dark.600",
          endIcon: (
            <Icon size={6} as={Ionicons} name="checkmark" color={"#000"} />
          ),
        }}
        dropdownCloseIcon={
          <Icon
            as={Ionicons}
            name="chevron-down-outline"
            size={6}
            mr={rW(2)}
            color="#fff"
          />
        }
        dropdownOpenIcon={
          <Icon
            as={Ionicons}
            name="chevron-up-outline"
            size={6}
            mr={rW(2)}
            color="#fff"
          />
        }
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15].map((item, index) => {
          return (
            <Select.Item
              key={index}
              fontWeight={"bold"}
              label={item.toString()}
              value={item.toString()}
            />
          );
        })}
      </Select>
    </VStack>
  );
};

export default memo(QtySelect);
