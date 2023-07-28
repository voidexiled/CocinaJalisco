import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import React, { Component, useState, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { Keyboard, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import axios from "axios";
import { getUserNameById as nameById } from "../utils/api";
import { STATUS } from "../utils/orderStatus";
import {
  VStack,
  HStack,
  ZStack,
  Container,
  Flex,
  Icon,
  Input,
  KeyboardAvoidingView,
  Pressable,
  Heading,
  Button,
  Skeleton,
  Center,
  Box,
  Fab,
  Actionsheet,
  Text,
  useDisclose,
  Modal,
  Radio,
} from "native-base";
import { Feather, AntDesign } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SearchBar from "../components/SearchBar";
import ReloadButton from "../components/ReloadButton";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../components/styles";
const { primary, secondary, tertiary, background, text, accent, textLight } =
  Colors;

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = React.useState("");
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [row, setRow] = useState();

  const loadData = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders"
      );
      setOrders(response.data);
      console.log("Ordenes:", response.data);
      loadData();
    } catch (error) {
      console.error("Error al obtener las ordenes:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const handleOpenRowOrder = (item) => {
    setRow(item);
    setShowModal(true);
  };
  const renderItem = ({ item }) => (
    <DataTable.Row onPress={() => handleOpenRowOrder(item)}>
      <DataTable.Cell
        textStyle={([styles.labelTable], { color: "#000" })}
        style={{ flex: 1 }}
      >
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaProvider
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
        insets={insets}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <VStack
            style={{
              height: "100%",
              maxHeight: "100%",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <VStack
              style={{
                height: rH(100),
                minWidth: "100%",
                maxWidth: "100%",
                maxHeight: rH(130),
                flexDirection: "row",
                padding: 16,
                justifyContent: "center",
              }}
            >
              <VStack
                style={{
                  height: "100%",

                  maxHeight: "100%",
                  minWidth: "80%",
                  maxWidth: "80%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                <SearchBar
                  fontSize={rW(21)}
                  color="#000"
                  onChangeText={(text) => {
                    setSearch(text);
                  }}
                />
              </VStack>

              <ReloadButton fetcho={fetchOrders} fetchu={fetchUsers} />
            </VStack>
            <VStack
              style={{
                height: rH(800),
                width: "100%",
              }}
            >
              <FlatList
                style={styles.tableContainer}
                data={orders}
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
                      {/* Establecer flex para controlar el ancho de las columnas */}
                      <DataTable.Title
                        textStyle={styles.headerLabelTable}
                        style={{ flex: 1 }}
                      >
                        Nombre
                      </DataTable.Title>
                      <DataTable.Title
                        textStyle={styles.headerLabelTable}
                        style={{ flex: 1 }}
                      >
                        Lugar
                      </DataTable.Title>
                      <DataTable.Title
                        textStyle={styles.headerLabelTable}
                        style={{ flex: 1 }}
                      >
                        Descripcion
                      </DataTable.Title>
                      <DataTable.Title
                        textStyle={styles.headerLabelTable}
                        style={{ flex: 1 }}
                      >
                        Hora
                      </DataTable.Title>
                      <DataTable.Title
                        textStyle={styles.headerLabelTable}
                        style={{ flex: 1 }}
                      >
                        Creado por
                      </DataTable.Title>
                      <DataTable.Title
                        textStyle={styles.headerLabelTable}
                        style={{ flex: 1 }}
                      >
                        Estado
                      </DataTable.Title>
                    </DataTable.Header>
                  </DataTable>
                )}
              />
            </VStack>

            <VStack
              style={{
                height: rH(110),
                minWidth: "100%",
                maxWidth: "100%",
              }}
            >
              <Fab
                placement="top-right"
                right={10}
                renderInPortal={false}
                shadow={2}
                backgroundColor={primary}
                size="sm"
                icon={
                  <Icon color="white" as={AntDesign} name="plus" size="sm" />
                }
              />
            </VStack>

            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              size="lg"
            >
              <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Header>{"Orden #" + row.id}</Modal.Header>
                <Modal.Body>
                  <VStack space={3}>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Sub Total</Text>
                      <Text color="blueGray.400">$298.77</Text>
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Tax</Text>
                      <Text color="blueGray.400">$38.84</Text>
                    </HStack>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text fontWeight="medium">Total Amount</Text>
                      <Text color="green.500">$337.61</Text>
                    </HStack>
                  </VStack>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    flex="1"
                    onPress={() => {
                      setShowModal2(true);
                    }}
                  >
                    Continue
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <Modal
              isOpen={showModal2}
              onClose={() => setShowModal2(false)}
              size="lg"
            >
              <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Header>Select Address</Modal.Header>
                <Modal.Body>
                  <Radio.Group defaultValue="address1" name="address" size="sm">
                    <VStack space={3}>
                      <Radio
                        alignItems="flex-start"
                        _text={{
                          mt: "-1",
                          ml: "2",
                          fontSize: "sm",
                        }}
                        value="address1"
                      >
                        4140 Parker Rd. Allentown, New Mexico 31134
                      </Radio>
                      <Radio
                        alignItems="flex-start"
                        _text={{
                          mt: "-1",
                          ml: "2",
                          fontSize: "sm",
                        }}
                        value="address2"
                      >
                        6391 Elign St. Celina, Delaware 10299
                      </Radio>
                    </VStack>
                  </Radio.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    flex="1"
                    onPress={() => {
                      setShowModal3(true);
                    }}
                  >
                    Continue
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>

            <Modal
              isOpen={showModal3}
              size="lg"
              onClose={() => setShowModal3(false)}
            >
              <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Header>Payment Options</Modal.Header>
                <Modal.Body>
                  <Radio.Group name="payment" size="sm">
                    <VStack space={3}>
                      <Radio
                        alignItems="flex-start"
                        _text={{
                          mt: "-1",
                          ml: "2",
                          fontSize: "sm",
                        }}
                        value="payment1"
                      >
                        Cash on delivery
                      </Radio>
                      <Radio
                        alignItems="flex-start"
                        _text={{
                          mt: "-1",
                          ml: "2",
                          fontSize: "sm",
                        }}
                        value="payment2"
                      >
                        Credit/ Debit/ ATM Card
                      </Radio>
                      <Radio
                        alignItems="flex-start"
                        _text={{
                          mt: "-1",
                          ml: "2",
                          fontSize: "sm",
                        }}
                        value="payment3"
                      >
                        UPI
                      </Radio>
                    </VStack>
                  </Radio.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    flex="1"
                    onPress={() => {
                      setShowModal(false);
                      setShowModal2(false);
                      setShowModal3(false);
                    }}
                  >
                    Checkout
                  </Button>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </VStack>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </TouchableWithoutFeedback>
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
    padding: 24,
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
    color: "#212121",
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

export default OrdersScreen;
