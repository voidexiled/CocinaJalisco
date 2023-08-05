import { View } from "react-native";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
  responsiveSize as rS,
} from "../utils/responsive";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { memo, useCallback, useEffect, useState } from "react";
import AppContainer from "../components/AppContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  VStack,
  HStack,
  Text,
  useColorMode,
  Heading,
  Box,
  useToast,
  Stack,
  Actionsheet,
  Icon,
  useDisclose,
  AlertDialog,
  Button,
  Input,
  Center,
  Container,
  Select,
  Modal,
  IconButton,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { Skeleton } from "native-base";
import { Colors, Dark } from "../components/styles";
import { getLocalTime } from "../utils/util";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import ProductSelect from "../components/ProductSelect";
import QtySelect from "../components/QtySelect";
import OverviewOrder from "../components/OverviewOrder";
import OverviewButton from "../components/OverviewButton";
import axios from "axios";
import OrderComponentAnnotations from "../components/OrderComponentAnnotations";
import { Ionicons } from "@expo/vector-icons";
import OrderComponentTable from "../components/OrderComponentTable";
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
  const [newProduct, setNewProduct] = useState("");
  const [newProductQty, setNewProductQty] = useState("1");
  // Obtener el parámetro 'rowData' de la ruta para acceder a los datos pasados
  const row = route.params?.rowData || {};
  const users = route.params?.users || {};
  const columns = ["Nombre", "Descripcion", "Precio", "Creado por"];
  const [ovData, setOvData] = useState([]);
  const [displayName, setDisplayName] = useState();
  const [permissionLevel, setPermissionLevel] = useState();
  const [userId, setUserId] = useState();
  const [anottation, setAnottation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);

  const toast = useToast();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Orden #" + row.id,
    });
    getLocalSession();
    setTimeout(() => {
      setLoading(false);
      calculateOrderTotal();
    }, 1000);
  }, []);

  useEffect(() => {
    fetchInventory();
    fetchOrderComponents();
  }, []);

  const calculateOrderTotal = useCallback(() => {
    let total = 0;
    ordComponents.forEach((item) => {
      total += item.total;
    });
    setOrderTotal(total);
  }, [ordComponents]);

  const showAlert = useCallback((msg, typeoftoast) => {
    if (typeoftoast === "success") {
      toast.show({
        placement: "top",
        render: () => (
          <Box bg="green.300" px="5" py="3" rounded="sm" mb={1}>
            {msg}
          </Box>
        ),
      });
    } else if (typeoftoast === "error") {
      toast.show({
        placement: "top",
        render: () => (
          <Box bg="red.300" px="5" py="3" rounded="sm" mb={1}>
            {msg}
          </Box>
        ),
      });
    }
  }, []);

  const getLocalSession = async () => {
    try {
      const value = await AsyncStorage.getItem("sessionData");
      if (value !== null) {
        // value previously stored
        const data = JSON.parse(value);

        setDisplayName(data.displayName);
        setPermissionLevel(data.permissionLevel);
        setUserId(data.id);

        return data;
      }
    } catch (e) {
      // error reading value
      navigation.replace("LoginScreen");
      console.log(e);
    }
  };
  const handleDeleteOrderComponent = useCallback(async () => {
    try {
      const response = await axios.delete(
        `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders/components/${selectedProduct.id}`
      );
      if (response.status === 200) {
        showAlert("Producto eliminado con éxito", "success");
        setShowModal(false);
        fetchOrderComponents();
      }
    } catch (error) {
      console.log(error);
      showAlert("Error al eliminar el producto", "error");
    }
  }, [selectedProduct]);
  const handleFinishOrder = useCallback(() => {}, []);
  const handleUpdateOverview = useCallback(() => {}, []);

  const handleAddNewProduct = useCallback(async () => {
    // newProduct
    // newProductQty

    const newProductObj = {
      orderId: row.id,
      createdBy: userId,
      displayName: newProduct,
      qty: Number(newProductQty),
      description: anottation,
      total:
        Number(newProductQty) *
        Number(inventory.find((item) => item.displayName === newProduct).price),
    };
    console.log("Objeto nuevo: ", newProductObj);
    if (newProduct === "") {
      showAlert("Debe seleccionar un producto", "error");
      return;
    }
    if (newProductQty === "") {
      showAlert("Debe seleccionar una cantidad", "error");
      return;
    }
    if (newProductQty === 0) {
      showAlert("Debe seleccionar una cantidad mayor a 0", "error");
      return;
    }
    if (
      newProductQty >
      inventory.find((item) => item.displayName === newProduct).qty
    ) {
      showAlert("No hay suficiente stock", "error");
      return;
    }
    try {
      const id = inventory.find((item) => item.displayName === newProduct).id;
      const tempInvObj = {
        qty:
          Number(
            inventory.find((item) => item.displayName === newProduct).qty
          ) - Number(newProductQty),
      };
      console.log("Objeto temporal de inventario: ", tempInvObj);
      const responseToInventory = await axios.patch(
        `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products/qty/${id}`,
        tempInvObj
      );

      const response = await axios.post(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders/components",
        newProductObj
      );

      fetchInventory();

      console.log("Producto agregado con éxito:", response.data);
      console.log("Inventario actualizado:", responseToInventory.data);
      showAlert("Producto agregado con éxito", "success");

      setOrdComponents([...ordComponents, response.data]);

      setNewProductQty(1);
    } catch (error) {
      console.log("Error al agregar el nuevo producto:", error);
      showAlert("Error al agregar el nuevo producto", "error");
    }
  }, [newProduct, newProductQty, row.id, userId, fetchInventory, anottation]);

  const fetchOrderComponents = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders/${row.id}/components`
      );
      setOrdComponents(response.data);
    } catch (error) {
      console.error("Error al obtener los componentes de la orden:", error);
    }
  }, []);

  const fetchInventory = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products"
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  }, []);

  const renderItem = useCallback(({ item }) => (
    <DataTable.Row
      onPress={() => {
        setSelectedProduct(item);
        setShowModal(true);
        // sumar todos los totales de los componentes
        // const tempTotal = ordComponents.reduce(
        //   (acc, item) => acc + item.total,
        //   0
        // );
        // setOrderTotal(tempTotal);
      }}
      backgroundColor={colorMode === "light" ? background : background}
    >
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 2 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          item.displayName + " x " + item.qty
        )}
      </DataTable.Cell>

      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 2 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            width={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          item.description
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
  ));

  return (
    <AppContainer
      colorMode={colorMode}
      insets={insets}
      alignItems={"center"}
      withKAV={true}
    >
      <Stack h="100%" minW="100%" alignItems={"center"}>
        <OrderComponentTable
          styles={styles}
          ordComponents={ordComponents}
          renderItem={renderItem}
          columns={columns}
        />
        <VStack
          bottom={0}
          left={0}
          position={"absolute"}
          w={"100%"}
          maxH={rH(600)}
          minH={rH(500)}
          h={rH(600)}
          bgColor={"#885B5E"}
          roundedTop={55}
          shadow={5}
          elevation={5}
          alignItems={"center"}
        >
          <VStack
            w={"100%"}
            h={"10%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading color={"#fff"} fontSize={rS(12)}>
              {"Orden de " + row.name}
            </Heading>
          </VStack>
          <VStack w={"95%"} h={"12%"}>
            <HStack
              minW={"100%"}
              h={"50%"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Detail header="Lugar:" child={row.place} />
              <Detail
                header="Hora:"
                child={getLocalTime(row.createdAt.split(" ")[1])}
              />
              <Detail header="Estado:" child={row._status} />
            </HStack>
            <HStack
              w={"100%"}
              h={"50%"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Detail header="Descripción: " child={row.description} />
              <Detail
                header="Tomada por: "
                child={
                  users.find((user) => user.id === row.createdBy)?.displayName
                }
              />
            </HStack>
          </VStack>
          <HStack
            w="100%"
            minH={"10%"}
            maxH={"15%"}
            justifyContent={"space-evenly"}
          >
            <ProductSelect
              inventory={inventory}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
            />
            <QtySelect
              newProductQty={newProductQty}
              setNewProductQty={setNewProductQty}
            />
            <OrderComponentAnnotations
              setAnottation={setAnottation}
              anottation={anottation}
            />
          </HStack>
          <OverviewOrder
            ovData={ordComponents}
            handleUpdateOverview={handleUpdateOverview}
          ></OverviewOrder>
          <HStack
            w={"100%"}
            h={"15%"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            <OverviewButton
              bgColor={"#5D9B9B"}
              pressedBgColor={"#838B8B"}
              text="Finalizar"
              onPress={() => {}}
              shadow={2}
            />
            <OverviewButton
              bgColor={"#966FD6"}
              pressedBgColor={"#865FC6"}
              text="Añadir Producto"
              onPress={handleAddNewProduct}
              shadow={2}
            />
          </HStack>
        </VStack>
      </Stack>

      {/*ALERT DIALOG*/}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton
            onPress={() => {
              setShowModal(false);
            }}
          />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              {/* {ordComponents.map((item, index) => {
                return (
                  <HStack
                    key={index}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text fontWeight="medium">
                      {item.displayName} x {item.qty}
                    </Text>
                    <Text color="blueGray.400">${item.total}</Text>
                  </HStack>
                );
              })} */}
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">
                  {selectedProduct.displayName + " x " + selectedProduct.qty}
                </Text>
                <Text color="blueGray.400">$ {selectedProduct.total}</Text>
              </HStack>

              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Amount</Text>
                <Text color="green.500">$ {selectedProduct.total}</Text>
              </HStack>
            </VStack>
          </Modal.Body>

          <Modal.Footer>
            <IconButton
              mx="2"
              flex="1"
              colorScheme={"red"}
              onPress={() => {
                handleDeleteOrderComponent();
                setShowModal(false);
              }}
              icon={<Icon as={Ionicons} name="trash" size={5}></Icon>}
            ></IconButton>
            <Button
              mx="2"
              flex="1"
              colorScheme={"rose"}
              onPress={() => {
                setShowModal(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              mx="2"
              flex="1"
              onPress={() => {
                setShowModal2(true);
              }}
            >
              Cobrar
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Select Address</Modal.Header>
          <Modal.Body>
            <VStack>
              <Text>Modal 2</Text>
            </VStack>
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

      <Modal isOpen={showModal3} size="lg" onClose={() => setShowModal3(false)}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Payment Options</Modal.Header>
          <Modal.Body>
            <VStack>
              <Text>Modal 3</Text>
            </VStack>
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
    </AppContainer>
  );
};

const Detail = ({ header, child }) => {
  return (
    <>
      <HStack h={"100%"}>
        <Text bold style={styles.headerValue}>
          {header}{" "}
        </Text>
        <Text bold style={styles.childValue}>
          {child}
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
  headerValue: {
    color: "#fff",
    fontSize: rS(7),
  },
  childValue: {
    color: "#fff",
    fontSize: rS(7),
  },
  datatablee: {
    height: "100%",
    backgroundColor: "#000",
  },
  tableContainer: {
    borderRadius: 10,
  },
  headerLabelTable: {
    fontSize: rS(7),
    color: "#fff",
  },
  labelTable: {
    fontSize: rS(7),
    color: tertiary,
  },
});

export default memo(OrderDetailsScreen);
