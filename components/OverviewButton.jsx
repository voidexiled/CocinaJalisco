import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";

import { View } from "react-native";
import React, { Component, memo } from "react";

import { Colors, Dark } from "./styles";

import { Text, Button } from "native-base";

const { primary } = Colors;

const OverviewButton = ({
  bgColor,
  pressedBgColor,
  text,
  onPress,
  ...props
}) => {
  return (
    <>
      <Button
        h={"50%"}
        w={"34%"}
        mb={4}
        _text={{ color: "#fff", fontWeight: "bold", fontSize: rH(16) }}
        bgColor={bgColor}
        _pressed={{ backgroundColor: pressedBgColor }}
        rounded={"xl"}
        onPress={onPress}
        {...props}
      >
        {text}
      </Button>
    </>
  );
};

export default memo(OverviewButton);
