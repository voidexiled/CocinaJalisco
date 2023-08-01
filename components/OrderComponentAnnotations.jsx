import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
import { View } from "react-native";
import React, { Component, memo } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Hidden,
  AlertDialog,
  Input,
} from "native-base";
const OrderComponentAnnotations = ({ anottation, setAnottation }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [tempAnottation, setTempAnottation] = React.useState(anottation);
  return (
    <VStack minW={"20%"} maxW={"20%"} h={"100%"}>
      <Box>
        <Text
          bold
          ml={rW(6)}
          fontSize={rH(14)}
          color={"transparent"}
          style={{}}
        >
          Anotaciones
        </Text>
      </Box>
      <Button
        onPress={() => {
          setTempAnottation(anottation);
          setIsOpen(true);
        }}
        _text={{ color: "#fff" }}
        borderColor={"#fff"}
        borderWidth={1}
        bgColor={"transparent"}
        _pressed={{ backgroundColor: "rgba(255,255,255,0.2)" }}
        rounded={"full"}
      >
        Anotaciones
      </Button>

      <AlertDialog isOpen={isOpen} motionPreset="fade">
        <AlertDialog.Content>
          <AlertDialog.Header fontSize="lg" fontWeight="bold">
            Anotaciones
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Input
              fontSize={"lg"}
              value={anottation}
              onChangeText={(text) => {
                setAnottation(text);
              }}
            ></Input>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              colorScheme="rose"
              onPress={() => {
                setAnottation(tempAnottation);
                setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              ml="3"
              onPress={() => {
                setIsOpen(false);
              }}
            >
              Save
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </VStack>
  );
};

export default OrderComponentAnnotations;
