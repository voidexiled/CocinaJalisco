import React, { useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Alert } from "react-native";
import * as Yup from "yup";
import axios from "axios";
//import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage
// formik

import { Formik } from "formik";

//icons
import { Feather, Ionicons, Fontisto } from "@expo/vector-icons";

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
import { AuthContext } from "../components/AuthProvider";
import { Colors } from "../components/styles";
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

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  //const { login } = useContext(AuthContext);
  useEffect(() => {
    // Verifica si hay datos de sesión guardados localmente y, si los hay, inicia sesión automáticamente
    checkLocalSession();
  }, []);

  const checkLocalSession = async () => {
    // const data = AsyncStorage.getItem("sessionData");
    // if (data) {
    //   AsyncStorage.removeItem("sessionData");
    // }
    // Aquí puedes implementar la lógica para verificar si hay datos de sesión guardados en el dispositivo
    // Por ejemplo, podrías usar AsyncStorage o SecureStore para almacenar datos de sesión de forma segura.
    // Si hay datos de sesión válidos, navega a la siguiente pantalla automáticamente.
    const sessionData = await retrieveSessionData(); // Implementa retrieveSessionData para obtener los datos de sesión

    if (sessionData) {
      // Aquí verifica si los datos de sesión son válidos, por ejemplo, si el token de autenticación es válido
      // Si los datos de sesión son válidos, navega a la siguiente pantalla
      // console.log(sessionData);
      // console.log(sessionData["result"].permissionLevel);
      navigation.replace("Main"); // Reemplaza "Dashboard" con el nombre de la pantalla a la que deseas navegar
    }
  };

  const handleLogin = async (values) => {
    try {
      // console.log(values);
      // Hace la solicitud a tu API para autenticar al usuario

      const response = await axios.post(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/users/login",
        values
      );
      // console.log(response);
      // console.log(response.data["message"]);

      // Aquí deberías verificar si la respuesta contiene los datos de sesión válidos (por ejemplo, el token de autenticación)
      const sessionData = response.data; // Asegúrate de adaptar esto según la estructura de respuesta de tu API
      //login();
      // Guarda los datos de sesión localmente, por ejemplo, usando AsyncStorage o SecureStore
      saveSessionData(sessionData); // Implementa saveSessionData para guardar los datos de sesión

      // Navega a la siguiente pantalla
      navigation.replace("Main"); // Reemplaza "Dashboard" con el nombre de la pantalla a la que deseas navegar
    } catch (error) {
      // Si hay un error en la autenticación, muestra un mensaje de error
      Alert.alert("Error", "Credenciales inválidas. Inténtalo nuevamente.");
    }
  };

  const loginSchema = Yup.object().shape({
    displayName: Yup.string().required("Este campo es obligatorio"),
    pswd: Yup.string().required("Este campo es obligatorio"),
  });
  // Función para obtener los datos de sesión guardados localmente
  const retrieveSessionData = async () => {
    try {
      //const sessionDataString = await AsyncStorage.getItem("sessionData");
      //if (sessionDataString) {
      //return JSON.parse(sessionDataString);
      //}
      return null;
    } catch (error) {
      console.error("Error al obtener los datos de sesión:", error);
      return null;
    }
  };

  // Función para guardar los datos de sesión localmente
  const saveSessionData = async (sessionData) => {
    try {
      //const sessionDataString = JSON.stringify(sessionData);
      //await AsyncStorage.setItem("sessionData", sessionDataString);
    } catch (error) {
      console.error("Error al guardar los datos de sesión:", error);
    }
  };
  return (
    <StyledContainer>
      <StatusBar style="auto" />
      <InnerContainer>
        <PageLogo resizeMode="cover" source={require("../assets/corona.png")} />
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
              <MyTextInput
                label="Nombre de usuario"
                icon="user"
                placeholder="Escribe tu nombre de usuario"
                placeholderTextColor={textLight}
                onChangeText={handleChange("displayName")}
                onBlur={handleBlur("displayName")}
                value={values.displayName}
                isUsername={true}
              ></MyTextInput>

              <MyTextInput
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
              ></MyTextInput>
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
  );
};

const MyTextInput = ({
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
        <Feather name={icon} size={24} color={accent} />
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

export default Login;
