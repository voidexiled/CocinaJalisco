import { Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";
import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import { StyleSheet } from "react-native";
import { Colors } from "./styles";
const { accent, text, background } = Colors;

const InventoryInput = forwardRef(({ label, icon, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <View style={[styles.inputContainer]}>
      <Input
        backgroundColor="#212121"
        borderRadius={12}
        padding={15}
        paddingLeft={rW(35)}
        paddingRight={rW(35)}
        fontSize={rW(16)}
        height={rH(50)}
        marginVertical={3}
        elevation={15}
        color="#fff"
        borderWidth={0}
        minWidth={rW(150)}
        placeholder={label}
        InputLeftElement={
          <Icon as={<Feather name={icon} />} size={5} ml="3" color="#fff" />
        }
        {...props}
        ref={ref} // Asigna la referencia proporcionada al TextInput
        placeholderTextColor="rgba(221,221,221,0.6)"
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
export default InventoryInput;
