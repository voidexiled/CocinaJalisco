import {
  responsiveHeight as rH,
  responsiveWidth as rW,
  responsiveSize as rS,
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
    <VStack minW={"20%"} maxW={"20%"} h={"100%"} pt={rS(4)}>
      <Box>
        <Text
          bold
          pl={rS(12)}
          fontSize={rS(7)}
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
        h={rS(18)}
        minH={rS(18)}
        _text={{ color: "#fff", fontSize: rS(6), fontWeight: "bold" }}
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
              fontSize={rS(10)}
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
