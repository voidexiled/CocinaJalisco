import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import { Container, Pressable, Icon, Button, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
const { primary, secondary, tertiary, background, text, accent, textLight } =
  Colors;

const ReloadButton = ({ fetcho, fetchu, ...props }) => {
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <VStack justifyContent={"center"} m={0} p={0}>
      <Pressable>
        <Button
          m={0}
          p={0}
          ml="auto"
          mr="auto"
          variant="unstyled"
          onPress={() => {
            fetcho();
            fetchu();
          }}
          onPressIn={() => {
            setIsFocus(true);
          }}
          onPressOut={() => {
            setIsFocus(false);
          }}
          {...props}
        >
          <Icon
            size={rW(35)}
            color={isFocus ? "blue.400" : primary}
            as={<Ionicons name="md-reload-outline" />}
          />
        </Button>
      </Pressable>
    </VStack>
  );
};

export default ReloadButton;
