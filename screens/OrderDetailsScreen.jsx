import { View } from "react-native";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
import React, {
  Component,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import AppContainer from "../components/AppContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Container,
  VStack,
  HStack,
  Text,
  useColorMode,
  Center,
  Heading,
  Divider,
  Box,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FlatList, Skeleton } from "native-base";
import { Colors, Dark } from "../components/styles";
import { getLocalTime } from "../utils/util";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { TouchableOpacity } from "react-native";
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
const OrderDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colorMode, toggleColorMode } = useColorMode();
  const [ordComponents, setOrdComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  // Obtener el parámetro 'rowData' de la ruta para acceder a los datos pasados
  const row = route.params?.rowData || {};
  const users = route.params?.users || {};
  const columns = ["Name", "Cantidad", "Precio", "Creado por"];

  const fetchInventory = useCallback(async () => {
    const response = await fetch(
      "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products"
    );
    const data = await response.json();
    console.log(data);
    setInventory(data);
  }, []);

  const loadData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchInventory();
    fetchOrderComponents();
    console.log(row);
    console.log(users);
  }, []);

  const fetchOrderComponents = useCallback(async () => {
    const response = await fetch(
      `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders/${row.id}/components`
    );
    const data = await response.json();
    console.log(data);
    setOrdComponents(data);
  }, []);

  const renderItem = ({ item }) => (
    <DataTable.Row
      onPress={() => handleOpenRowOrder(item)}
      backgroundColor={colorMode === "light" ? background : background}
    >
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          item.displayName
        )}
      </DataTable.Cell>

      <DataTable.Cell numeric textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            width={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          item.qty
        )}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          "$ " +
          inventory.find((i) => i.displayName === item.displayName).price *
            item.qty
        )}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          users.find((u) => u.id === item.createdBy).displayName
        )}
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <AppContainer
      colorMode={colorMode}
      insets={insets}
      alignItems={"center"}
      bagColor={"#fff"}
    >
      <Container h="100%" minW="90%" bgColor={"success.100"}>
        <VStack minW={"100%"} minH={"75%"} bgColor={"error.100"} p={0} m={0}>
          {/** container top */}
          <VStack
            p={4}
            minW={"100%"}
            minH={"25%"}
            justifyContent={"center"}
            rounded={"xl"}
            space={2}
            bgColor={"warning.100"}
          >
            <VStack minW={"100%"} minH={"5%"} justifyContent={"center"}>
              {/** Order # Container */}
              <Center>
                <Heading fontSize={rW(44)} color={tertiary}>
                  {"Order #" + row.id}
                </Heading>
              </Center>
            </VStack>

            <VStack minW={"100%"} minH={"20%"} divider={<Divider />}>
              {/** Order Details Container */}
              <HStack minW={"100%"} minH={"25%"}>
                <VStack minW={"100%"} maxW={"100%"}>
                  <Detail
                    title={"CLIENTE"}
                    color={"blue.700"}
                    value={row.name}
                  />
                  <Detail title={"LUGAR"} color={"red.700"} value={row.place} />
                  <Detail
                    title={"DESCRIPCION"}
                    color={"green.700"}
                    value={row.description}
                  />
                  <Detail
                    title={"HORA"}
                    color={"violet.700"}
                    value={getLocalTime(row.createdAt.split(" ")[1])}
                  />
                  <Detail
                    title={"TOMADA POR"}
                    color={"cyan.700"}
                    value={users.find((user) => user.id === row.id).displayName}
                  />

                  <Detail
                    title={"ESTADO"}
                    color={"red.700"}
                    value={row._status}
                  />
                </VStack>
              </HStack>
            </VStack>
          </VStack>
          <VStack
            minW={"100%"}
            minH={"40%"}
            justifyContent={"center"}
            bgColor={"amber.100"}
          >
            <FlatList
              style={styles.tableContainer}
              data={ordComponents}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              stickyHeaderIndices={[0]}
              ListHeaderComponentStyle={{
                backgroundColor: primary,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              ListHeaderComponent={() => (
                <DataTable styles={styles.datatablee}>
                  <DataTable.Header>
                    {columns.map((column, index) => (
                      <DataTable.Title
                        style={{ flex: 1 }}
                        key={index}
                        numeric={true}
                        {...(index === 0 && { numeric: false })}
                      >
                        <Text style={styles.headerLabelTable}>{column}</Text>
                      </DataTable.Title>
                    ))}

                    {/* Establecer flex para controlar el ancho de las columnas */}
                  </DataTable.Header>
                </DataTable>
              )}
            />
          </VStack>
        </VStack>
        <VStack minW={"100%"} minH={"20%"} bgColor={"blue.100"}></VStack>
      </Container>
    </AppContainer>
  );
};

const Detail = ({ title, value, color }) => {
  const titleFontSize = rW(20);
  const valueFontSize = rW(16);
  return (
    <>
      <HStack alignItems={"center"}>
        <Text color={color} fontSize={titleFontSize}>
          {title + ":   "}
        </Text>
        <Text color={tertiary} fontSize={valueFontSize}>
          {value}
        </Text>
      </HStack>
    </>
  );
};

const LineSeparator = () => {
  return (
    <View
      style={{
        height: rH(0),

        marginVertical: 1,
        boxSizing: "border-box",
        borderColor: "gray",
        borderWidth: 0.3,
      }}
    ></View>
  );
};

const TableContainer = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack
      space={4}
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
      bg={colorMode === "light" ? "white" : "gray.800"}
      p={4}
      rounded="md"
    >
      {children}
    </VStack>
  );
};

const styles = StyleSheet.create({
  datatablee: {
    height: "auto",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  tePriceAndQty: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "100%",
  },
  tableContainer: {
    borderRadius: 10,
    paddingTop: 24,
    maxHeight: rH(500),
  },
  icon: {
    top: rH(20),
  },
  iconQty: {
    top: rH(20),
    left: rW(20),
  },
  buttonLabel: {
    color: "#fff",
    fontSize: rW(20),
  },
  headerLabelTable: {
    fontSize: rW(14),
    color: "#fff",
    textAlign: "left",
  },
  labelTable: {
    fontSize: rW(14),
    color: tertiary,
  },
  deleteIcon: {
    color: "#000",
  },
  footer: {
    height: rH(100), // Espacio para el pie de página de la tabla
  },
  textInput: {
    height: rH(50),
    width: rW(160),
    margin: "auto",
  },
});

export default memo(OrderDetailsScreen);
