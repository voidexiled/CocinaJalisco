import styled from "styled-components/native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

// colors

export const Colors = {
  primary: "#FF6F61", // Coral
  secondary: "#FFBA49", // Amarillo
  tertiary: "#3D405B", // Azul oscuro
  accent: "#5FC3E4", // Celeste
  background: "#F4F1DE", // Crema claro
  brand: "#277DA1", // Azul
  text: "#4A4E69", // Azul grisáceo
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
  background-color: ${background};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${background};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${text};
  ${(props) =>
    props.productname &&
    `
    height: 50px;

  background-color: rgba(33,33,33,1);
  border-radius:12px;
  elevation: 15;
  color: #fff;`}
  ${(props) =>
    props.productprice &&
    `
    height: 50px;

  background-color: rgba(33,33,33,1);
  border-radius:12px;
  elevation: 15;
  color: #fff;`}
`;

export const StyledInputLabel = styled.Text`
  color: ${text};
  font-size: 13px;
  text-align: left;
  ${(props) =>
    props.productname &&
    `

  `}
  ${(props) =>
    props.productprice &&
    `

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
  height: 60px;
  align-items: center;
  ${(props) =>
    props.inventorySubmit &&
    `
    background-color: ${secondary};
    
    height: 55px;

  `}
`;

export const ButtonText = styled.Text`
  color: ${background};
  font-size: 16px;
  font-weight: bold;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == "SUCCESS" ? success : error)};
`;

export const Line = styled.View`
  height: 1px;
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
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${primary};
  font-size: 15px;
`;
