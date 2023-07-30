import { Text, View } from "react-native";
import React, { Component, memo } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "native-base";
import { VStack } from "native-base";
import { Dark } from "../components/styles";

const AppContainer = ({
  colorMode,
  insets,
  alignItems,
  children,
  ...props
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaProvider
        style={{ marginTop: insets.top, marginBottom: insets.bottom }}
        backgroundColor={
          colorMode === "light" ? "rgba(255,255,255,0)" : Dark.background
        }
      >
        <VStack
          h={"100%"}
          maxW={"100%"}
          mt={Platform.OS === "ios" ? 40 : 0}
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
