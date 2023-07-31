import { Text, View } from "react-native";
import React, { Component, memo } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "native-base";
import { VStack } from "native-base";
import { Dark } from "../components/styles";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";

const AppContainer = ({
  bagColor,
  colorMode,
  insets,
  alignItems,
  children,
  ...props
}) => {
  if (!bagColor) bagColor = "rgba(255,255,255,0)";
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaProvider
        style={{ paddingTop: insets.top, marginBottom: insets.bottom }}
        backgroundColor={colorMode === "light" ? bagColor : Dark.background}
      >
        <VStack
          h={"100%"}
          maxW={"100%"}
          mt={Platform.OS === "ios" ? rH(10) : 0}
          alignItems={alignItems}
          {...props}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {children}
          </KeyboardAvoidingView>
        </VStack>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
};

export default memo(AppContainer);
