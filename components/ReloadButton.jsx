import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import { Container, Pressable, Icon, Button, Flex } from "native-base";
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
    <Flex style={{}}>
      <Pressable>
        <Button
          pt={2}
          pl={0}
          pr={0}
          ml={rW(60)}
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
            size={rW(30)}
            color={isFocus ? "blue.400" : primary}
            as={<Ionicons name="md-reload-outline" />}
          />
        </Button>
      </Pressable>
    </Flex>
  );
};

export default ReloadButton;
