import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
import { View } from "react-native";
import React, { Component, memo, useState } from "react";

import { VStack, Select, Icon, Text, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles";
const { primary } = Colors;
const ProductSelect = ({ inventory, newProduct, setNewProduct, ...props }) => {
  const [language, setLanguage] = useState("key0");
  return (
    <VStack minW={"60%"} maxW={"60%"} h={"100%"}>
      <Box>
        <Text bold ml={rW(6)} fontSize={rH(14)} color={"#fff"}>
          Producto
        </Text>
      </Box>

      <Select
        pl="6"
        placeholder="Seleccionar producto"
        selectedValue={newProduct}
        onValueChange={(itemValue) => setNewProduct(itemValue)}
        w={"100%"}
        h={"75%"}
        color={"#fff"}
        borderColor={"#fff"}
        placeholderTextColor={"#fff"}
        fontSize={rH(16)}
        fontWeight={"bold"}
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
        {inventory.map
          ? inventory.map((item) => {
              return (
                <Select.Item
                  fontWeight={"bold"}
                  color={"#fff"}
                  label={item.displayName}
                  value={item.displayName}
                  key={item.id}
                />
              );
            })
          : null}
      </Select>
    </VStack>
  );
};

export default memo(ProductSelect);
