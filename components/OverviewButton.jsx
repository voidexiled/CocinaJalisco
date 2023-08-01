import {
  responsiveHeight as rH,
  responsiveWidth as rW,
  responsiveSize as rS,
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
        minH={rS(20)}
        h={rS(22)}
        maxH={rS(25)}
        w={"34%"}
        mb={rS(4)}
        _text={{ color: "#fff", fontWeight: "bold", fontSize: rS(7) }}
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
