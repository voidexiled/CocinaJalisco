import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import React, { useState, useEffect, useCallback, memo } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

import {
  VStack,
  HStack,
  Icon,
  Skeleton,
  Fab,
  Text,
  useColorMode,
  useDisclose,
  Actionsheet,
  Container,
  Box,
} from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ReloadButton from "../components/ReloadButton";
import { Colors, Dark } from "../components/styles";
import AppContainer from "../components/AppContainer";
const { primary, tertiary, background, text, secondary } = Colors;

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);

  const [row, setRow] = useState();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [columns, setColumns] = useState([
    "Nombre",
    "Lugar",
    "Descripcion",
    "Hora",
    "Creado por",
    "Estado",
  ]);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSearch = useCallback(
    (text) => {
      const newData = orders.filter((item) => {
        const itemData = `${item.name} ${item.place} ${
          item.description
        } ${getLocalTime(item.createdAt.split(" ")[1])} ${
          users.find((user) => user.id === item.id)?.displayName
        } ${item._status}`.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredOrders(newData);
      loadData();
    },
    [orders, users]
  );

  const sortTable = useCallback(
    (columnName) => {
      const newDirection = direction === "desc" ? "asc" : "desc";
      setSelectedColumn(columnName);
      setDirection(newDirection);
      setFilteredOrders((prevData) => {
        const newData = [...prevData];
        newData.sort((a, b) => {
          if (newDirection === "asc") {
            return a[columnName] < b[columnName] ? -1 : 1;
          } else {
            return a[columnName] > b[columnName] ? -1 : 1;
          }
        });
        return newData;
      });
    },
    [direction]
  );

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
    if (isFocused) {
      fetchUsers();
      fetchOrders();
    }
  }, [isFocused]);

  const getLocalTime = (time) => {
    time = time.split(":");

    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue = "" + hours;
    } else if (hours > 12) {
      timeValue = "" + (hours - 12);
    } else if (hours == 0) {
      timeValue = "12";
    }

    timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;

    timeValue += hours >= 12 ? " PM" : " AM";
    return timeValue;
  };
  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders"
      );
      setOrders(response.data);
      setFilteredOrders(response.data);
      //console.log("Ordenes:", response.data);
      loadData();
    } catch (error) {
      console.error("Error al obtener las ordenes:", error);
    }
  }, []);
  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  }, []);

  const handleOpenRowOrder = useCallback((item) => {
    setRow(item);
    onOpen();
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
          item.name
        )}
      </DataTable.Cell>

      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            width={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          item.place
        )}
      </DataTable.Cell>
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          item.description
        )}
      </DataTable.Cell>
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={16}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          getLocalTime(item.createdAt.split(" ")[1])
        )}
      </DataTable.Cell>
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={10}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          users.find((user) => user.id === item.id)?.displayName
        )}
      </DataTable.Cell>
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton endColor="warmGray.500" w={8} h={3} rounded={20}></Skeleton>
        ) : (
          item._status
        )}
      </DataTable.Cell>
    </DataTable.Row>
  );
  return (
    <AppContainer colorMode={colorMode} insets={insets} alignItems={"center"}>
      <Container h="100%" minW="90%">
        <HStack //p={0} h={rH(100)} maxH={rH(100)} mx={rW(20)}>
          h={"10%"}
          minH={"10%"}
          maxH="10%"
          minW={"100%"}
          px={rW(20)}
          //bgColor={"#000"}
        >
          <SearchBar
            fontSize={rW(18)}
            //               color="#000"
            haveFilter={true}
            onChangeText={(text) => {
              handleSearch(text);
            }}
          />

          <ReloadButton fetcho={fetchOrders} fetchu={fetchUsers} />
        </HStack>
        <VStack
          h={"70%"}
          w={"100%"}
          //</Container>bgColor={"#0f0"}
        >
          <FlatList
            style={styles.tableContainer}
            data={filteredOrders}
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
                    <DataTable.Title style={{ flex: 1 }} key={index}>
                      <TouchableOpacity onPress={() => sortTable(column)}>
                        <Text style={styles.headerLabelTable}>
                          {column + " "}
                          {selectedColumn === column && (
                            <Feather
                              name={
                                direction === "desc"
                                  ? "chevron-down"
                                  : "chevron-up"
                              }
                            />
                          )}
                        </Text>
                      </TouchableOpacity>
                    </DataTable.Title>
                  ))}

                  {/* Establecer flex para controlar el ancho de las columnas */}
                </DataTable.Header>
              </DataTable>
            )}
          />
        </VStack>

        <VStack
          h="20%"
          style={{
            minWidth: "100%",
            maxWidth: "100%",
          }}
          p={0}
        >
          <Fab
            placement="bottom-right"
            renderInPortal={false}
            shadow={2}
            backgroundColor={primary}
            size="sm"
            icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
          />
        </VStack>
        <Actionsheet
          isOpen={isOpen}
          onClose={onClose}
          size="full"
          hideDragIndicator
        >
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text
                fontSize={rW(20)}
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                {row && "CLIENTE:      " + row.name}
              </Text>
            </Box>
            <Actionsheet.Item
              startIcon={<Icon as={Feather} size="6" name="menu" />}
            >
              Ver detalles
            </Actionsheet.Item>

            <Actionsheet.Item
              startIcon={<Icon as={Feather} size="6" name="edit" />}
            >
              Editar
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<Icon as={Feather} name="trash-2" size="6" />}
            >
              Eliminar
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Container>
    </AppContainer>
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

export default memo(OrdersScreen);
