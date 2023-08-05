import React, { Component, memo, useCallback } from "react";
import {
  VStack,
  Center,
  HStack,
  Text,
  Checkbox,
  Icon,
  Stack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FILTER } from "../utils/orderStatus";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Colors } from "./styles";
import { StyleSheet } from "react-native";
import { responsiveSize } from "../utils/responsive";
const { primary, secondary, accent, light, dark, grey } = Colors;

const Filters = ({ filters, setFilters, loadData, ...props }) => {
  const handleFilter = useCallback(
    (filter, isChecked) => {
      let newFilters = [...filters];
      let tempFilters = newFilters;
      if (isChecked) {
        newFilters.push(filter);
      } else {
        newFilters = newFilters.filter((f) => f !== filter);
      }
      if (newFilters != tempFilters) {
        setFilters(newFilters);
        loadData();
      }

      console.log("newFilters", newFilters);
    },
    [filters, setFilters, loadData]
  );

  return (
    <>
      <HStack
        justifyContent={"space-between"}
        alignItems="flex-start"
        maxW="100%"
        flexWrap="wrap"
        {...props}
      >
        <HStack alignItems="center" w={"100%"}>
          <Text fontSize="sm" fontWeight="bold">
            FILTROS
          </Text>
        </HStack>

        <HStack alignItems="center" width={"33%"} my={2}>
          <BouncyCheckbox
            size={20}
            fillColor={primary}
            unfillColor="transparent"
            text="Todos"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            onPress={(isChecked) => {
              handleFilter(FILTER.TODOS, isChecked);
            }}
          />
        </HStack>
        <HStack alignItems="center" width={"33%"} my={2}>
          <BouncyCheckbox
            size={20}
            fillColor={primary}
            unfillColor="transparent"
            text="Pendientes"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            onPress={(isChecked) => {
              handleFilter(FILTER.PENDIENTE, isChecked);
            }}
          />
        </HStack>
        <HStack alignItems="center" width={"33%"} my={2}>
          <BouncyCheckbox
            size={20}
            fillColor={primary}
            unfillColor="transparent"
            text="Entregados"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            onPress={(isChecked) => {
              handleFilter(FILTER.ENTREGADO, isChecked);
            }}
          />
        </HStack>
        <HStack alignItems="center" width={"33%"} my={2}>
          <BouncyCheckbox
            size={20}
            fillColor={primary}
            unfillColor="transparent"
            text="Pagados"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            onPress={(isChecked) => {
              handleFilter(FILTER.PAGADO, isChecked);
            }}
          />
        </HStack>
        <HStack alignItems="center" width={"33%"} my={2}>
          <BouncyCheckbox
            size={20}
            fillColor={primary}
            unfillColor="transparent"
            text="Fiados"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            onPress={(isChecked) => {
              handleFilter(FILTER.FIADO, isChecked);
            }}
          />
        </HStack>
        <HStack alignItems="center" width={"33%"} my={2}>
          <BouncyCheckbox
            size={20}
            fillColor={primary}
            unfillColor="transparent"
            text="Cancelados"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            onPress={(isChecked) => {
              handleFilter(FILTER.CANCELADO, isChecked);
            }}
          />
        </HStack>
      </HStack>
    </>
  );
};
const styles = StyleSheet.create({
  innerIconStyle: {
    borderWidth: 2,
    borderRadius: 8,
  },
  iconStyle: {
    borderColor: primary,
  },
  textStyle: { textDecorationLine: "none", fontSize: responsiveSize(8) },
});

export default memo(Filters);
/* The above code is defining a JavaScript object called `styles` using the `StyleSheet.create` method.
This object is likely used to define styles for a React component. */
