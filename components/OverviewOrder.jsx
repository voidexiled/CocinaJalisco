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
          margin: 0,
          padding: 0,
          borderWidth: 0,
          paddingVertical: 0,
        }}
      >
        {item.name === "Total" ? (
          <>
            <DataTable.Cell numeric textStyle={{}} style={{ flex: 1 }}>
              {/* <VStack
                w={"50%"}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              > */}
              <Text bold color={"#fff"} fontSize={rW(16)}>
                {item.name}
              </Text>
              {/* </VStack> */}
            </DataTable.Cell>
            <DataTable.Cell numeric textStyle={{}} style={{ flex: 1 }}>
              {/*<VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>*/}
              <Text bold color={"#fff"} fontSize={rW(16)}>
                {"$ " + item.price}
              </Text>
              {/* </VStack> */}
            </DataTable.Cell>
          </>
        ) : (
          <>
            <DataTable.Cell
              borderless
              textStyle={{}}
              style={{ flex: 1, padding: 0, margin: 0, minHeight: "100%" }}
            >
              {/* <VStack
                w={"50%"}
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
              > */}
              <Text bold color={"#fff"} fontSize={rW(14)}>
                {item.name + " x " + item.qty}
              </Text>
              {/* </VStack> */}
            </DataTable.Cell>
            <DataTable.Cell
              numeric
              borderless
              textStyle={{}}
              style={{ flex: 1, padding: 0, margin: 0, minHeight: "100%" }}
            >
              {/*<VStack w={"50%"} justifyContent={"center"} alignItems={"center"}>*/}
              <Text bold color={"#fff"} fontSize={rW(14)}>
                {"$ " + item.price * item.qty}
              </Text>
              {/* </VStack> */}
            </DataTable.Cell>
          </>
        )}
      </DataTable.Row>
    );
  }, []);
  return (
    <VStack
      mt={"5%"}
      h={"40%"}
      maxH={"53%"}
      borderWidth={1}
      borderColor={"#fff"}
      minW={"90%"}
      maxW={"90%"}
      rounded={"md"}
      py={4}
    >
      <Center maxH={"10%"}>
        <Heading fontSize={rW(18)} color={"#fff"}>
          Overview
        </Heading>
      </Center>

      {/* <FlatList
        bgColor={"blue.100"}
        nestedScrollEnabled={true}
        scrollEnabled={true}
        minH={"100%"}
        w={"100%"}
        h={"100%"}
        data={ovData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        StickyHeaderComponent={true}
        ListHeaderComponent={() => (
          <HStack pb={rH(2)} bgColor={"blue.100"}>
            <VStack w={"30%"} justifyContent={"center"} alignItems={"center"}>
              <Text bold color={"#fff"} fontSize={rW(18)}>
                Producto
              </Text>
            </VStack>
            <VStack w={"30%"} justifyContent={"center"} alignItems={"center"}>
              <Text bold color={"#fff"} fontSize={rW(18)}>
                Cantidad
              </Text>
            </VStack>
          </HStack>
        )}
      /> */}
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
          <DataTable styles={{}}>
            <DataTable.Header style={{ paddingVertical: 0, borderWidth: 0 }}>
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
                  <Text bold style={{ color: "#fff", fontSize: rW(16) }}>
                    {column}
                  </Text>
                </DataTable.Title>
              ))}

              {/* Establecer flex para controlar el ancho de las columnas */}
            </DataTable.Header>
          </DataTable>
        )}
      />
    </VStack>
  );
};

export default memo(OverviewOrder);
