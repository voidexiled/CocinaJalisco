import { responsiveSize as rS } from "../utils/responsive";
import { View } from "react-native";

import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import React, { Component, memo, useEffect, useCallback } from "react";
import {
  VStack,
  HStack,
  Text,
  Heading,
  Center,
  ScrollView,
  FlatList,
} from "native-base";
import { Colors, Dark } from "../components/styles";
const { primary } = Colors;
import { DataTable } from "react-native-paper";
const OverviewOrder = ({ ovData, handleUpdateOverview }) => {
  useEffect(() => {
    console.log("ovData", ovData);
  }, [ovData]);
  const renderItem = useCallback(({ item }) => {
    return (
      <DataTable.Row
        onPress={() => {}}
        borderless
        style={{
          minHeight: rS(14),
        }}
      >
        <>
          <DataTable.Cell
            borderless
            textStyle={{}}
            style={{ flex: 1, padding: 0, margin: 0 }}
          >
            {/* <VStack
                w={"50%"}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              > */}
            <Text bold color={"#fff"} fontSize={rS(7)}>
              {item.displayName + " x " + item.qty}
            </Text>
            {/* </VStack> */}
          </DataTable.Cell>
          <DataTable.Cell
            numeric
            borderless
            textStyle={{}}
            style={{ flex: 1, padding: 0, margin: 0 }}
          >
            {/*<VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>*/}
            <Text bold color={"#fff"} fontSize={rS(7)}>
              {"$ " + item.total}
            </Text>
            {/* </VStack> */}
          </DataTable.Cell>
        </>
      </DataTable.Row>
    );
  }, []);
  const getTotal = useCallback(() => {
    let total = 0;
    ovData.forEach((item) => {
      total += item.total;
    });
    return total;
  }, [ovData]);

  return (
    <VStack
      mt={rS(10)}
      borderWidth={1}
      borderColor={"#fff"}
      minW={"90%"}
      maxW={"90%"}
      h={rS(80)}
      maxH={rS(120)}
      rounded={"md"}
      py={2}
      flexGrow={1}
      flex={1}
    >
      <HStack justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={rS(9)} color={"#fff"}>
          Overview
        </Text>
      </HStack>

      <FlatList
        style={{ minWidth: "90%", padding: 0, paddingVertical: 0 }}
        data={ovData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        stickyHeaderIndices={[0]}
        borderWidth={0}
        borderless
        onScrollToTop={() => {
          handleUpdateOverview();
        }}
        ListHeaderComponentStyle={{
          border: "none",
          backgroundColor: "#885B5E",
          borderWidth: 0,
        }}
        ListHeaderComponent={() => (
          <DataTable>
            <DataTable.Header>
              {["Producto", "Precio"].map((column, index) => (
                <DataTable.Title
                  numeric={column === "Precio" ? true : false}
                  style={{
                    flex: 1,
                    padding: 0,
                    margin: 0,
                    paddingVertical: 0,
                    borderWidth: 0,
                    justifyContent: "center",
                  }}
                  key={index}
                >
                  <Text bold style={{ color: "#fff", fontSize: rS(6) }}>
                    {column}
                  </Text>
                </DataTable.Title>
              ))}

              {/* Establecer flex para controlar el ancho de las columnas */}
            </DataTable.Header>
          </DataTable>
        )}
        ListFooterComponent={() => (
          <DataTable.Row
            borderless
            style={{
              minHeight: rS(14),
            }}
          >
            <DataTable.Cell numeric textStyle={{}} style={{ flex: 1 }}>
              {/* <VStack
                w={"50%"}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              > */}
              <Text bold color={"#fff"} fontSize={rS(8)}>
                {"Total"}
              </Text>
              {/* </VStack> */}
            </DataTable.Cell>
            <DataTable.Cell numeric textStyle={{}} style={{ flex: 1 }}>
              {/*<VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>*/}
              <Text bold color={"#fff"} fontSize={rW(rS(7))}>
                {"$ " + getTotal()}
              </Text>
              {/* </VStack> */}
            </DataTable.Cell>
          </DataTable.Row>
        )}
      />
    </VStack>
  );
};

export default memo(OverviewOrder);
