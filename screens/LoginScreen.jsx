import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";

import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
// formik
import { Formik } from "formik";

import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import { useState } from "react";
import { Colors } from "../components/styles";
const { textLight } = Colors;

//Components
import LoginInput from "../components/LoginInput";

const LoginScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    checkLocalSession();
  }, []);

  const checkLocalSession = async () => {
    const sessionData = await retrieveSessionData();

    if (sessionData) {
      navigation.replace("MainTabNavigatorScreen");
    }
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/users/login",
        values
      );
      const sessionData = response.data;
      saveSessionData(sessionData);
      navigation.replace("MainTabNavigatorScreen");
    } catch (error) {
      Alert.alert("Error", "Credenciales inválidas. Inténtalo nuevamente.");
    }
  };

  const loginSchema = Yup.object().shape({
    displayName: Yup.string().required("Este campo es obligatorio"),
    pswd: Yup.string().required("Este campo es obligatorio"),
  });

  const retrieveSessionData = async () => {
    try {
      const sessionDataString = await AsyncStorage.getItem("sessionData");
      if (sessionDataString) {
        return JSON.parse(sessionDataString);
      }
      return null;
    } catch (error) {
      console.error("Error al obtener los datos de sesión:", error);
      return null;
    }
  };

  const saveSessionData = async (sessionData) => {
    try {
      const sessionDataString = JSON.stringify(sessionData);
      await AsyncStorage.setItem("sessionData", sessionDataString);
    } catch (error) {
      console.error("Error al guardar los datos de sesión:", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <StyledContainer>
        <InnerContainer>
          <StatusBar style="auto" />
          <PageLogo
            resizeMode="cover"
            source={require("../assets/corona.png")}
          />
          <PageTitle>Cocina Jalisco</PageTitle>
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues={{ displayName: "", pswd: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <LoginInput
                  label="Nombre de usuario"
                  icon="user"
                  placeholder="Escribe tu nombre de usuario"
                  placeholderTextColor={textLight}
                  onChangeText={handleChange("displayName")}
                  onBlur={handleBlur("displayName")}
                  value={values.displayName}
                  isUsername={true}
                ></LoginInput>

                <LoginInput
                  label="Contraseña"
                  icon="lock"
                  placeholder="Escribe tu contraseña"
                  placeholderTextColor={textLight}
                  onChangeText={handleChange("pswd")}
                  onBlur={handleBlur("pswd")}
                  value={values.pswd}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                ></LoginInput>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Iniciar sesión</ButtonText>
                </StyledButton>
                <Line />
                {/* <StyledButton google={true} onPress={handleSubmit}>
                <Fontisto name="google" color={background} size={25}></Fontisto>
                <ButtonText google={true}>
                  Iniciar sesión con Google{" "}
                </ButtonText>
              </StyledButton> */}
                <ExtraView>
                  <ExtraText>¿No tienes una cuenta? </ExtraText>
                  <TextLink>
                    <TextLinkContent>Registrate</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
