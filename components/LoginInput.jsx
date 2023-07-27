import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";

import { Text, View } from "react-native";
import React, { Component } from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Colors } from "./styles";

const { accent, text } = Colors;

import {
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
} from "./styles";

const LoginInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Feather name={icon} size={rW(24)} color={accent} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props}></StyledTextInput>
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={24}
            color={text}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default LoginInput;
