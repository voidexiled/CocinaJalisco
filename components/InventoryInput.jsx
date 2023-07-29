import { Text, View } from "react-native";
import React, { useState, memo } from "react";
import { Input, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";
import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import { StyleSheet } from "react-native";
import { Colors } from "./styles";
const { accent, text, textLight, background, secondary, primary, tertiary } =
  Colors;

const InventoryInput = forwardRef(({ label, icon, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <View style={[styles.inputContainer]}>
      <Input
        variant={"unstyled"}
        //backgroundColor="#212121"
        borderRadius={12}
        paddingLeft={rW(25)}
        paddingRight={rW(25)}
        fontSize={rW(16)}
        //height={rH(50)}
        height={rH(45)}
        //marginVertical={3}
        //elevation={15}
        //color="#fff"
        //borderWidth={0}
        minWidth={rW(100)}
        placeholder={label}
        color={tertiary}
        borderColor={primary}
        focusOutlineColor={"blue.600"}
        borderWidth={1}
        InputLeftElement={
          <Icon as={<Feather name={icon} />} size={5} ml="3" color={primary} />
        }
        {...props}
        ref={ref} // Asigna la referencia proporcionada al TextInput
        placeholderTextColor={textLight}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: rH(16),
    backgroundColor: "none",
  },
  textInput: {
    backgroundColor: "#212121",
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderRadius: 12,
    fontSize: rW(16),
    height: rH(50),
    marginVertical: 3,
    marginBottom: 10,
    elevation: 15,
    color: "#fff",
    margin: "auto",
  },
});
export default memo(InventoryInput);
