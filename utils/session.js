import { AsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// return true or false if local session stored in AsyncStorage without navigation replace
export const getLocalSession = async () => {
  try {
    const sessionDataString = await AsyncStorage.getItem("sessionData");
    console.log("sessionDataString: ", sessionDataString);
    if (sessionDataString !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al obtener los datos de sesión1:", error);
  }
};
export const retrieveSessionData = async () => {
  try {
    const sessionDataString = await AsyncStorage.getItem("sessionData");
    if (sessionDataString) {
      return JSON.parse(sessionDataString);
    }
    return null;
  } catch (error) {
    console.error("Error al obtener los datos de sesión2:", error);
    return null;
  }
};

export const saveLocalSession = async (sessionData) => {
  try {
    const sessionDataString = JSON.stringify(sessionData);
    await AsyncStorage.setItem("sessionData", sessionDataString);
  } catch (error) {
    console.error("Error al guardar los datos de sesión3:", error);
  }
};
