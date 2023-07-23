import {
  responsiveWidth as rW,
  responsiveHeight as rH,
} from "../utils/responsive";

import React, { useState, useEffect, useRef, forwardRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TextInput, Button, DataTable, Snackbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native"; // Importa useIsFocused

import {
  StyledContainer,
  StyledFormArea,
  StyledTextInput,
  InnerContainer,
  StyledButton,
  ButtonText,
  LeftIcon,
} from "../components/styles";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { KeyboardAvoidingView } from "react-native";

const offset = Platform.OS === "android" ? -100 : 0;
const behavior = Platform.OS === "android" ? "height" : "padding";

const InventoryScreen = () => {
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");

  const productNameRef = useRef(null);
  const productPriceRef = useRef(null);
  const productQtyRef = useRef(null);

  const [inventory, setInventory] = useState([]);
  const isFocused = useIsFocused(); // Usa el hook useIsFocused
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(
    "Porfavor llenar todos los campos."
  );

  useEffect(() => {
    if (isFocused) {
      fetchInventory();
    }
  }, [isFocused]);
  const showAlert = () => {
    setIsAlertVisible(true);
  };

  const hideAlert = () => {
    setIsAlertVisible(false);
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products"
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productQty) {
      setAlertMessage("Porfavor llenar todos los campos.");
      showAlert();
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
      setAlertMessage(`Producto ${productName} agregado correctamente.`);
      showAlert();
      setProductName("");
      setProductPrice("");
      setProductQty("");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      setAlertMessage("Error al agregar el producto");
      showAlert();
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

  const handleEditProduct = (product) => {
    navigation.navigate("EditarProductoScreen", { product });
  };

  const renderItem = ({ item }) => (
    <DataTable.Row onPress={() => handleEditProduct(item)}>
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 2 }}>
        {item.displayName}
      </DataTable.Cell>
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {item.qty}
      </DataTable.Cell>
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        $ {item.price}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={styles.labelTable} style={{ flex: 1 }}>
        <Button icon="delete" onPress={() => handleDeleteProduct(item)} />
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <StyledContainer keyboardShouldPersistTaps="true">
      <InnerContainer>
        <Snackbar
          visible={isAlertVisible}
          onDismiss={hideAlert}
          duration={3000}
          action={{
            label: "OK",
            onPress: hideAlert,
          }}
          zIndex={9999}
        >
          {alertMessage}
        </Snackbar>
        <StyledFormArea>
          <MyTextInput
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
          <View style={styles.tePriceAndQty}>
            <MyTextInput
              style={styles.textInput}
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
            <MyTextInput
              style={styles.textInput}
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
          </View>

          <StyledButton
            inventorySubmit={true}
            mode="contained"
            onPress={handleAddProduct}
            style={{ marginBottom: 45 }}
          >
            <ButtonText style={styles.buttonLabel}>Add Product</ButtonText>
          </StyledButton>
          <FlatList
            style={styles.tableContainer}
            data={inventory}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <DataTable styles={styles.datatablee}>
                <DataTable.Header>
                  {/* Establecer flex para controlar el ancho de las columnas */}
                  <DataTable.Title
                    textStyle={styles.headerLabelTable}
                    style={{ flex: 2 }}
                  >
                    Nombre
                  </DataTable.Title>
                  <DataTable.Title
                    textStyle={styles.headerLabelTable}
                    style={{ flex: 1 }}
                  >
                    Existencia
                  </DataTable.Title>
                  <DataTable.Title
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
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
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
    backgroundColor: "#212121",
    borderRadius: 10,
    elevation: 10,
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
    fontSize: 20,
  },
  headerLabelTable: {
    fontSize: 14,
    color: "#fff",
  },
  labelTable: {
    color: "#fff",
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

const MyTextInput = forwardRef(({ label, icon, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <View
      style={[
        styles.inputContainer,
        { borderColor: isFocused ? "#007AFF" : "#C0C0C0" },
      ]}
    >
      <LeftIcon style={icon !== "package" ? styles.icon : styles.iconQty}>
        <Feather name={icon} size={16} color="#fff" />
      </LeftIcon>
      <StyledTextInput
        {...props}
        ref={ref} // Asigna la referencia proporcionada al TextInput
        placeholderTextColor="rgba(221,221,221,0.6)"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
});

export default InventoryScreen;
