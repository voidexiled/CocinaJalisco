import styled from "styled-components/native";
import Constants from "expo-constants";
import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import { useColorModeValue } from "native-base";
const StatusBarHeight = Constants.statusBarHeight;

// colors

// export const primary = useColorModeValue("#FF6F61", "#FF6F61"); // Coral
// export const secondary = useColorModeValue("#FFBA49", "#FFBA49"); // Amarillo
// export const tertiary = useColorModeValue("#3D405B", "#3D405B"); // Azul oscuro
// export const accent = useColorModeValue("#5FC3E4", "#5FC3E4"); // Celeste
// export const background = useColorModeValue("#fff", "#000"); // Crema claro
// export const brand = useColorModeValue("#277DA1", "#277DA1"); // Azul
// export const text = useColorModeValue("#4A4E69", "#4A4E69"); // Azul grisáceo
// export const textLight = useColorModeValue("#9A8C98", "#9A8C98"); // Gris claro
// export const border = useColorModeValue("#E9E9E9", "#E9E9E9"); // Gris suave
// export const success = useColorModeValue("#5ECC62", "#5ECC62"); // Verde claro
// export const error = useColorModeValue("#FF453A", "#FF453A"); // Rojo
// export const warning = useColorModeValue("#FF9642", "#FF9642"); // Naranja

export const Colors = {
  primary: "#FF6F61", // Coral
  secondary: "#FFBA49", // Amarillo
  tertiary: "#3D405B", // Azul oscuro
  accent: "#5FC3E4", // Celeste
  background: "#fff", // Crema claro
  brand: "#277DA1", // Azul
  text: "#4A4E69", // Azul grisáceo
  textLight: "#9A8C98", // Gris claro
  border: "#E9E9E9", // Gris suave
  success: "#5ECC62", // Verde claro
  error: "#FF453A", // Rojo
  warning: "#FF9642", // Naranja
};
export const Dark = {
  primary: "#FF6F61", // Coral
  secondary: "#050300", // Negro
  tertiary: "#3D405B", // Azul oscuro
  accent: "#e1f4fa", // Blanco
  background: "#4A4E69", // Gris
  brand: "#277DA1", // Azul
  text: "#fff", // Azul grisáceo
  textLight: "#9A8C98", // Gris claro
  border: "#E9E9E9", // Gris suave
  success: "#5ECC62", // Verde claro
  error: "#FF453A", // Rojo
  warning: "#FF9642", // Naranja
};

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

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 10}px;
  padding-bottom: 10px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: ${rW(250)}px;
  height: ${rH(200)}px;
`;

export const PageTitle = styled.Text`
  font-size: ${rW(30)}px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: ${rW(18)}px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: ${rW(16)}px;
  height: ${rH(60)}px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${text};
  ${(props) =>
    props.productname &&
    `
    height: ${rH(50)}px;

  background-color: rgba(33,33,33,1);
  border-radius:12px;
  elevation: 15;
  color: #fff;`}
  ${(props) =>
    props.productprice &&
    `
    height: ${rH(50)}px;
    margin-right: 10px;
  
  background-color: rgba(33,33,33,1);
  border-radius:12px;
  elevation: 15;
  color: #fff;`}
  ${(props) =>
    props.productqty &&
    `
    height: ${rH(50)}px;
    margin-left: 10px;
  background-color: rgba(33,33,33,1);
  border-radius:12px;
  elevation: 15;
  color: #fff;`}
`;

export const StyledInputLabel = styled.Text`
  color: ${text};
  font-size: ${rW(13)}px;
  text-align: left;
  ${(props) =>
    props.productname &&
    `
    
  `}
  ${(props) =>
    props.productprice &&
    `
    left: 0px;    
`}
${(props) =>
    props.productqty &&
    `
    overflow: hidden; }
  right: 0px;
  `}
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 35px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${primary};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: ${rH(60)}px;
  align-items: center;
  font-size: ${rW(14)}px;
  ${(props) =>
    props.inventorySubmit &&
    `
    background-color: ${secondary};
    height: ${rH(50)}px;
    width: ${rW(180)}px;
    border-radius: 18px;
    text-align: center;

    
  `}
`;

export const ButtonText = styled.Text`
  color: ${background};
  font-size: ${rW(16)}px;
  font-weight: bold;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: ${rW(13)}px;
  color: ${(props) => (props.type == "SUCCESS" ? success : error)};
`;

export const Line = styled.View`
  height: ${rH(1)}px;
  width: 100%;
  background-color: ${border};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  color: ${tertiary};
  font-size: ${rW(15)}px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${primary};
  font-size: ${rW(15)}px;
`;
