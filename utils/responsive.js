import { Dimensions } from "react-native";
const widthMobileUI = 508.2352941176471;
const heightMobileUI = 1063.0588235294117;

export const responsiveWidth = (width) => {
  console.log("dimension width: ", Dimensions.get("window").width);
  console.log(" wMobileUi: ", widthMobileUI);
  console.log("widthpx: ", width);
  console.log(
    "res: ",
    (Dimensions.get("window").width * width) / widthMobileUI
  );
  return (Dimensions.get("window").width * width) / widthMobileUI;
};

export const responsiveHeight = (height) => {
  console.log("dimension height: ", Dimensions.get("window").height);
  console.log(" hMobileUi: ", heightMobileUI);
  console.log("heightpx: ", height);
  console.log(
    "res: ",
    (Dimensions.get("window").height * height) / heightMobileUI
  );
  return (Dimensions.get("window").height * height) / heightMobileUI;
};
