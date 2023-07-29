import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Feather, AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { StyledFormArea, StyledButton, ButtonText } from "../components/styles";
import { useNavigation } from "@react-navigation/native";
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
} from "native-base";
import InventoryInput from "../components/InventoryInput";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, Dark } from "../components/styles";

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

  const loadData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchInventory();
    }
  }, [isFocused]);

  const showAlert = useCallback((msg, typeoftoast) => {
    if (typeoftoast === "success") {
      toast.show({
        render: () => (
          <Box bg="green.300" px="5" py="3" rounded="sm" mb={1}>
            {msg}
          </Box>
        ),
      });
    } else if (typeoftoast === "error") {
      toast.show({
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

      // const response = await axios.post(
      //   "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products",
      //   newProduct,
      //   {
      //     onUploadProgress: (progressEvent) => {
      //       // Calcular y actualizar el progreso de la carga
      //       const currprogress = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       );
      //       setProgress(currprogress);
      //     },
      //   }
      // );
      const response = await axios.post(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products",
        newProduct
      );
      console.log("Response: ", response.data);
      setInventory([...inventory, response.data]);
      setAlertMessage(`Producto ${productName} agregado correctamente.`);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaProvider
        style={{ paddinTop: insets.top, paddingBottom: insets.bottom }}
        backgroundColor={
          colorMode === "light" ? "rgba(255,255,255,0)" : Dark.background
        }
      >
        <VStack h={"100%"} maxW={"100%"} mt={rH(35)} alignItems={"center"}>
          <StyledFormArea height={rH(860)}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <Center h={rH(20)} p={0} m={0}>
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
                  backgroundColor:
                    colorMode === "light" ? primary : Dark.primary,
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
                <Modal.Content maxWidth="350">
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
                          onSubmitEditing={() =>
                            productPriceRef.current.focus()
                          } // Mueve el foco al siguiente campo en el onSubmitEditing
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
                            onSubmitEditing={() =>
                              productQtyRef.current.focus()
                            } // Mueve el foco al siguiente campo en el onSubmitEditing
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
                      <VStack w="100%" pt={rH(4)}>
                        <Box width="100%">
                          <Progress value={0} />
                        </Box>
                      </VStack>
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
                      >
                        <ButtonText style={styles.buttonLabel}>
                          Add Product
                        </ButtonText>
                      </StyledButton>
                    </VStack>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </KeyboardAvoidingView>
          </StyledFormArea>
          <VStack w={"full"} height={rH(110)}>
            <Fab
              placement="top-right"
              right={10}
              renderInPortal={false}
              shadow={2}
              bgColor={primary}
              icon={<Icon as={AntDesign} name="plus" />}
              onPress={() => setShowModal(true)}
            />
          </VStack>
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
                fontSize="16"
                color="gray.500"
                _dark={{
                  color: "gray.300",
                }}
              >
                {row &&
                  row.displayName +
                    "      PRECIO:  $" +
                    row.price +
                    "      CANTIDAD:   " +
                    row.qty}
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
    maxHeight: rH(720),
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
