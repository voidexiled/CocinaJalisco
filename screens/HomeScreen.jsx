import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";

import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import { Colors } from "../components/styles";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  StyledContainer,
  InnerContainer,
  SubTitle,
  StyledButton,
  ButtonText,
} from "../components/styles";
import { Container, Flex, Spacer, useColorMode } from "native-base";

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

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colorMode, toggleColorMode } = useColorMode();
  var permissionLevel = 0;
  var displayName = "";

  useEffect(() => {
    const session = getLocalSession();
    if (session) {
      permissionLevel = session.permissionLevel;
      displayName = session.displayName;
    }
  }, []);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("sessionData");
      //logout();
      navigation.replace("LoginScreen");
    } catch (e) {
      console.log(e);
    }
  };

  const getLocalSession = async () => {
    try {
      const value = await AsyncStorage.getItem("sessionData");
      if (value !== null) {
        // value previously stored
        const data = JSON.parse(value);
        console.log(data);
        return data.result;
      }
    } catch (e) {
      // error reading value
      navigation.replace("LoginScreen");
      console.log(e);
    }
  };

  return (
    <Flex>
      <StatusBar style="auto" />
      <SubTitle>{displayName}</SubTitle>
      <SubTitle>{permissionLevel}</SubTitle>
      <StyledButton onPress={handleLogout}>
        <ButtonText>Logout</ButtonText>
      </StyledButton>
      <StyledButton onPress={toggleColorMode}>
        <ButtonText> Mode</ButtonText>
      </StyledButton>
    </Flex>
  );
};

export default HomeScreen;
