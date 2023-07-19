import React, { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
// formik
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Formik } from "formik";
import Principal from "./Principal";
//icons
import { Feather, Ionicons, Fontisto } from "@expo/vector-icons";

import { Colors } from "../components/styles";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage
const Tab = createBottomTabNavigator();

import { AuthContext } from "../components/AuthProvider";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  StyledButton,
  ButtonText,
  LeftIcon,
  RightIcon,
  Line,
  MsgBox,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import { useState } from "react";

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

const Home = ({ navigation }) => {
  //const { logout, isUserLoggedIn } = useContext(AuthContext);
  var permissionLevel = 0;
  var displayName = "";

  useEffect(() => {
    // Verifica si hay datos de sesión guardados localmente y, si los hay, inicia sesión automáticamente
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
      navigation.replace("Login");
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
      navigation.replace("Login");
      console.log(e);
    }
  };

  return (
    <StyledContainer>
      <StatusBar style="auto" />
      <InnerContainer>
        <SubTitle>{displayName}</SubTitle>
        <SubTitle>{permissionLevel}</SubTitle>
        <StyledButton onPress={handleLogout}>
          <ButtonText> Logout</ButtonText>
        </StyledButton>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Home;
