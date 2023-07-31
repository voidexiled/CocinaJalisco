import { View } from "react-native";
import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import React, { Component, memo, useEffect } from "react";
import {
  VStack,
  HStack,
  Text,
  Heading,
  Center,
  ScrollView,
  FlatList,
} from "native-base";

const OverviewOrder = ({ ovData }) => {
  useEffect(() => {
    console.log("ovData", ovData);
  }, []);
  const renderItem = ({ item }) => {
    return (
      <HStack alignItems={"center"} px={4} bgColor={"amber.100"}>
        <VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>
          <Text bold color={"#fff"} fontSize={rW(16)}>
            {item.name}
          </Text>
        </VStack>
        <VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>
          <Text bold color={"#fff"} fontSize={rW(16)}>
            {item.value}
          </Text>
        </VStack>
      </HStack>
    );
  };
  return (
    <VStack
      minH={"50%"}
      maxH={"50%"}
      borderWidth={1}
      borderColor={"#fff"}
      minW={"90%"}
      maxW={"90%"}
      rounded={"md"}
      py={4}
    >
      <Center maxH={"10%"}>
        <Heading fontSize={rW(22)} color={"#fff"}>
          Overview
        </Heading>
      </Center>
      <HStack pb={rH(2)} bgColor={"blue.100"}>
        <VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>
          <Text bold color={"#fff"} fontSize={rW(18)}>
            Producto
          </Text>
        </VStack>
        <VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>
          <Text bold color={"#fff"} fontSize={rW(18)}>
            Cantidad
          </Text>
        </VStack>
      </HStack>
      <FlatList
        w={"100%"}
        h={"100%"}
        data={ovData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </VStack>
  );
};

export default memo(OverviewOrder);
