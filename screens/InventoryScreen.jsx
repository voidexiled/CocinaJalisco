import {
  responsiveWidth as rW,
  responsiveHeight as rH,
  responsiveSize as rS,
} from "../utils/responsive";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { DataTable } from "react-native-paper";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { StyledFormArea, StyledButton, ButtonText } from "../components/styles";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  KeyboardAvoidingView,
  VStack,
  IconButton,
  Skeleton,
  Modal,
  Text,
  Fab,
  Icon,
  Heading,
  Center,
  Actionsheet,
  useDisclose,
  useColorMode,
  Progress,
  HStack,
  Box,
  Container,
} from "native-base";
import InventoryInput from "../components/InventoryInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Dark } from "../components/styles";
import AppContainer from "../components/AppContainer";
const { accent, text, textLight, background, secondary, primary, tertiary } =
  Colors;

import { useToast } from "native-base";

const InventoryScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const productQtyRef = useRef(null);
  const [inventory, setInventory] = useState([]);
  const isFocused = useIsFocused();
  const [row, setRow] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();
  const { colorMode, toggleColorMode } = useColorMode();

  const toast = useToast();

  useEffect(() => {
    console.log(StatusBar.currentHeight);
  }, []);
  const loadData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchInventory();
    }
  }, [isFocused]);

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

  const fetchInventory = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products"
      );
      loadData();
      setInventory(response.data);
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  }, []);

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productQty) {
      showAlert("Porfavor llenar todos los campos.", "error");
      return;
    }

    if (isNaN(productPrice) || isNaN(productQty)) {
      showAlert("Precio y cantidad deben ser numeros.", "error");
      return;
    }
    var newProduct = {
      displayName: productName,
      price: productPrice,
      qty: productQty,
    };

    try {
      console.log(newProduct);
      const response = await axios.post(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products",
        newProduct
      );
      console.log("Response: ", response.data);
      setInventory([...inventory, response.data]);
      showAlert("Producto agregado correctamente.", "success");
      setProductName("");
      setProductPrice("");
      setProductQty("");
      productNameRef.current.focus();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      setAlertMessage("Error al agregar el producto");
      showAlert("Error al agregar el producto", "error");
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      console.log(product.id);
      const api = `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products/${product.id}`;
      console.log(api);
      await axios.delete(api);
      const updatedInventory = inventory.filter(
        (item) => item.id !== product.id
      );
      setInventory(updatedInventory);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleEditProduct = useCallback(
    (product) => {
      setRow(product);
      if (row !== null) {
        console.log("Editando producto: ", product);
        onOpen();
      }
    },
    [onOpen, row]
  );

  const renderItem = useCallback(
    ({ item }) => (
      <DataTable.Row
        onPress={() => handleEditProduct(item)}
        backgroundColor={colorMode === "light" ? background : background}
      >
        <DataTable.Cell
          textStyle={{ color: colorMode === "light" ? text : text }}
          style={{ flex: 2 }}
        >
          {loading ? (
            <Skeleton endColor="warmGray.400" h={3} rounded={20} width="24" />
          ) : (
            item.displayName
          )}
        </DataTable.Cell>
        <DataTable.Cell
          numeric
          textStyle={styles.labelTable}
          style={{ flex: 1 }}
        >
          {loading ? (
            <Skeleton
              endColor="warmGray.400"
              h={3}
              rounded={20}
              width="12"
              right={0}
            />
          ) : (
            item.qty
          )}
        </DataTable.Cell>
        <DataTable.Cell
          numeric
          textStyle={styles.labelTable}
          style={{ flex: 1 }}
        >
          {loading ? (
            <Skeleton
              endColor="warmGray.400"
              h={3}
              rounded={20}
              width="8"
              right={0}
            />
          ) : (
            "$ " + item.price
          )}
        </DataTable.Cell>
        <DataTable.Cell
          numeric
          textStyle={styles.labelTable}
          style={{ flex: 1 }}
        >
          {loading ? (
            <Skeleton
              endColor="warmGray.400"
              h={3}
              rounded={20}
              width="12"
              right={0}
            />
          ) : (
            <IconButton
              icon={<Feather color={tertiary} name="trash-2"></Feather>}
              onPress={() => handleDeleteProduct(item)}
            />
          )}
        </DataTable.Cell>
      </DataTable.Row>
    ),
    [colorMode, handleDeleteProduct, handleEditProduct, loading]
  );

  return (
    <AppContainer colorMode={colorMode} insets={insets} alignItems={"center"}>
      <Container h="100%" minW="90%">
        {/* TOP Container*/}
        <VStack minW="100%" h={"80%"}>
          <Center h={"10%"}>
            <Heading p={0} m={0}>
              Inventario
            </Heading>
          </Center>
          <FlatList
            style={styles.tableContainer}
            data={inventory}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            stickyHeaderIndices={[0]}
            ListHeaderComponentStyle={{
              backgroundColor: colorMode === "light" ? primary : Dark.primary,
              marginTop: 0,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            ListHeaderComponent={() => (
              <DataTable styles={styles.datatablee}>
                <DataTable.Header>
                  <DataTable.Title
                    textStyle={styles.headerLabelTable}
                    style={{ flex: 2 }}
                  >
                    Nombre
                  </DataTable.Title>
                  <DataTable.Title
                    numeric
                    textStyle={styles.headerLabelTable}
                    style={{ flex: 1 }}
                  >
                    Existencia
                  </DataTable.Title>
                  <DataTable.Title
                    numeric
                    textStyle={styles.headerLabelTable}
                    style={{ flex: 1 }}
                  >
                    Precio
                  </DataTable.Title>
                  <DataTable.Title
                    numeric
                    textStyle={styles.headerLabelTable}
                    style={{ flex: 1 }}
                  >
                    Eliminar
                  </DataTable.Title>
                </DataTable.Header>
              </DataTable>
            )}
          />

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="lg"
          >
            <Modal.Content minW={"70%"} maxW={"70%"}>
              <Modal.CloseButton />
              <Modal.Header>Añadir Producto</Modal.Header>
              <Modal.Body>
                <VStack
                  h={rH(150)}
                  //bg="amber.100"
                >
                  <VStack
                    w="100%" //bgColor={"green.600"}
                  >
                    <InventoryInput
                      icon={"shopping-bag"}
                      productname={true}
                      label="Product Name"
                      value={productName}
                      onChangeText={setProductName}
                      placeholder="Nombre del producto"
                      returnKeyType="next"
                      ref={productNameRef}
                      onSubmitEditing={() => productPriceRef.current.focus()} // Mueve el foco al siguiente campo en el onSubmitEditing
                    />
                  </VStack>

                  <HStack
                    w="100%"
                    //bgColor="amber.600"
                    justifyContent="space-around"
                  >
                    <VStack
                      w={"40%"} //bgColor={"red.600"}
                    >
                      <InventoryInput
                        icon={"dollar-sign"}
                        productprice={true}
                        label="Product Price"
                        value={productPrice}
                        onChangeText={setProductPrice}
                        keyboardType="numeric"
                        placeholder="0"
                        returnKeyType="next"
                        ref={productPriceRef}
                        onSubmitEditing={() => productQtyRef.current.focus()} // Mueve el foco al siguiente campo en el onSubmitEditing
                      />
                    </VStack>
                    <VStack
                      w={"40%"} //bgColor={"blue.600"}
                    >
                      <InventoryInput
                        icon={"package"}
                        productqty={true}
                        label="Quantity"
                        value={productQty}
                        onChangeText={setProductQty}
                        keyboardType="numeric"
                        placeholder="0"
                        ref={productQtyRef}
                        onSubmitEditing={handleAddProduct}
                      />
                    </VStack>
                  </HStack>
                  {/* <VStack w="100%" alignItems={"center"}>

                </VStack> */}
                </VStack>
              </Modal.Body>
              <Modal.Footer>
                <VStack
                  w="100%"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <StyledButton
                    inventorySubmit={true}
                    mode="contained"
                    onPress={handleAddProduct}
                    style={{ minHeight: rS(24) }}
                  >
                    <ButtonText style={{ color: "#fff", fontSize: rS(8) }}>
                      Add Product
                    </ButtonText>
                  </StyledButton>
                </VStack>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </VStack>
        {/* BOTTOM Container*/}
        <VStack minW="100%" h={"20%"}>
          <Fab
            placement="bottom-right"
            right={rW(20)}
            bottom={rH(20)}
            renderInPortal={false}
            shadow={2}
            bgColor={primary}
            icon={<Icon as={AntDesign} name="plus" />}
            onPress={() => setShowModal(true)}
          />
        </VStack>
        {/* ActionSheet Select Row */}
        <Actionsheet
          isOpen={isOpen}
          onClose={onClose}
          size="full"
          hideDragIndicator
        >
          <Actionsheet.Content>
            <Box w="100%" h={rS(30)} px={4} justifyContent="center">
              <Text
                fontSize={rS(10)}
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                {row &&
                  row.displayName + "    $" + row.price + "    Qty: " + row.qty}
              </Text>
            </Box>
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
    borderRadius: rS(10),
    paddingTop: rS(10),
    maxHeight: rS(400),
  },
  icon: {
    top: rS(20),
  },
  iconQty: {
    top: rS(20),
    left: rS(20),
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
    height: rH(100),
  },
  textInput: {
    height: rH(50),
    width: rW(160),
    margin: "auto",
  },
});

export default memo(InventoryScreen);
