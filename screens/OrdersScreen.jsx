import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";

import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import {
  VStack,
  HStack,
  ZStack,
  Container,
  Flex,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Heading,
  Button,
} from "native-base";
import { Feather } from "@expo/vector-icons";

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import { StatusBar } from "expo-status-bar";
const OrdersScreen = () => {
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaProvider
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        insets={insets}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <VStack
            style={{
              height: "100%",
              maxHeight: "100%",
              alignItems: "center",
              flexDirection: "column",
              backgroundColor: "#ff0000",
            }}
          >
            <VStack
              style={{
                height: rH(110),
                minWidth: "100%",
                maxWidth: "100%",
                maxHeight: rH(130),
                flexDirection: "row",
                padding: 16,
                justifyContent: "center",
              }}
              backgroundColor={"#212121"}
            >
              <SearchBar
                fontSize={rW(21)}
                color="#fff"
                onChangeText={(text) => {
                  setSearch(text);
                }}
              />
            </VStack>
            <VStack
              style={{
                backgroundColor: "#fff",
                height: rH(800),
                width: "100%",
              }}
            >
              <Button></Button>
            </VStack>
            <VStack
              style={{
                backgroundColor: "#00ff22",
                height: rH(300),
                minWidth: "100%",
                maxWidth: "100%",
              }}
            >
              <Button></Button>
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

export default OrdersScreen;
