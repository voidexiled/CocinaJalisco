import { Text, View, Dimensions } from "react-native";
import React, { Component, memo, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "native-base";
import { VStack } from "native-base";
import { Dark } from "../components/styles";
import { responsiveSize } from "../utils/responsive";

const AppContainer = ({
  bagColor,
  colorMode,
  insets,
  alignItems,
  children,
  withKAV,
  ...props
}) => {
  if (withKAV === undefined) withKAV = true;
  if (!bagColor) bagColor = "rgba(255,255,255,0)";

  useEffect(() => {}, []);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <VStack bg={bagColor} alignItems={alignItems} {...props}>
          {withKAV && (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {children}
            </KeyboardAvoidingView>
          )}
          {!withKAV && children}
        </VStack>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default memo(AppContainer);
