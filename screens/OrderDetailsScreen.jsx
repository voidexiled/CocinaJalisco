import { View } from "react-native";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
import React, { Component, memo, useEffect } from "react";
import AppContainer from "../components/AppContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Container,
  VStack,
  HStack,
  Text,
  useColorMode,
  Center,
  Heading,
  Divider,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import { Colors, Dark } from "../components/styles";

const {
  primary,
  secondary,
  tertiary,
  accent,
  background,
  text,
  textLight,
  border,
  success,
  error,
  warning,
  brand,
} = Colors;
const OrderDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colorMode, toggleColorMode } = useColorMode();

  // Obtener el parámetro 'rowData' de la ruta para acceder a los datos pasados
  const row = route.params?.rowData || {};
  const users = route.params?.users || {};
  const titleFontSize = rW(24);
  const valueFontSize = rW(18);
  useEffect(() => {
    console.log(row);
    console.log(users);
  }, []);

  return (
    <AppContainer colorMode={colorMode} insets={insets} alignItems={"center"}>
      <Container h="100%" minW="90%">
        <VStack minW={"100%"} minH={"75%"}>
          {/** container top */}
          <VStack minW={"100%"} minH={"5%"} justifyContent={"center"}>
            {/** Order # Container */}
            <Center>
              <Heading fontSize={rW(44)} color={tertiary}>
                {"Order #" + row.id}
              </Heading>
            </Center>
          </VStack>

          <VStack minW={"100%"} minH={"20%"}>
            {/** Order Details Container */}
            <HStack minW={"100%"} minH={"25%"} bgColor={"amber.100"}>
              <VStack minW={"100%"} maxW={"100%"}>
                <Detail title={"CLIENTE"} color={"blue.700"} value={row.name} />
                <Detail title={"LUGAR"} color={"red.700"} value={row.place} />
                <Detail
                  title={"DESCRIPCION"}
                  color={"green.700"}
                  value={row.description}
                />
                <Detail
                  title={"HORA"}
                  color={"violet.700"}
                  value={row.createdAt}
                />
                <Detail
                  title={"TOMADA POR"}
                  color={"cyan.700"}
                  value={users.find((user) => user.id === row.id).displayName}
                />

                <Detail
                  title={"ESTADO"}
                  color={"red.700"}
                  value={row._status}
                />
              </VStack>
            </HStack>
          </VStack>
        </VStack>
        <VStack minW={"100%"} minH={"20%"} bgColor={"blue.500"}></VStack>
      </Container>
    </AppContainer>
  );
};

const Detail = ({ title, value, color }) => {
  const titleFontSize = rW(20);
  const valueFontSize = rW(16);
  return (
    <>
      <Divider bg={"warmGray.900"} h={rH(1)} maxH={1} />
      <HStack alignItems={"center"}>
        <Text color={color} fontSize={titleFontSize}>
          {title + ":   "}
        </Text>
        <Text color={tertiary} fontSize={valueFontSize}>
          {value}
        </Text>
      </HStack>
    </>
  );
};

const TableContainer = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack
      space={4}
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
      bg={colorMode === "light" ? "white" : "gray.800"}
      p={4}
      rounded="md"
    >
      {children}
    </VStack>
  );
};

export default memo(OrderDetailsScreen);
