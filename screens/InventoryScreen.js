import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useIsFocused, useTheme } from "@react-navigation/native"; // Importa useIsFocused
import {
  StyledContainer,
  StyledFormArea,
  StyledTextInput,
  InnerContainer,
  StyledButton,
  ButtonText,
  StyledInputLabel,
  LeftIcon,
} from "../components/styles";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";

const InventoryScreen = () => {
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQty, setProductQty] = useState("");
  const [inventory, setInventory] = useState([]);
  const isFocused = useIsFocused(); // Usa el hook useIsFocused
  const theme = useTheme();
  useEffect(() => {
    // Ejecutar fetchInventory cada vez que la pantalla se enfoca nuevamente
    if (isFocused) {
      fetchInventory();
    }
  }, [isFocused]);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products"
      ); // Reemplaza "TU_API_ENDPOINT" con la URL de tu API
      setInventory(response.data);
    } catch (error) {
      console.error("Error al obtener el inventario:", error);
    }
  };

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !productQty) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const newProduct = {
      displayName: productName,
      price: productPrice,
      qty: productQty,
    };

    try {
      console.log(newProduct);
      const response = await axios.post(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products",
        newProduct
      ); // Reemplaza "TU_API_ENDPOINT" con la URL de tu API
      console.log("Response: ", response.data);
      setInventory([...inventory, response.data]);
      setProductName("");
      setProductPrice("");
      setProductQty("");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const handleDeleteProduct = async (product) => {
    try {
      console.log(product.id);
      const api = `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products/${product.id}`;
      console.log(api);
      await axios.delete(api); // Reemplaza "TU_API_ENDPOINT" con la URL de tu API
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
        {item.price}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={styles.labelTable} style={{ flex: 1 }}>
        <Button icon="delete" onPress={() => handleDeleteProduct(item)} />
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <StyledContainer>
      <InnerContainer>
        <StyledFormArea>
          <MyTextInput
            icon={"shopping-bag"}
            productname={true}
            label="Product Name"
            value={productName}
            onChangeText={setProductName}
            placeholder="Nombre del producto"
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
            />
          </View>

          <StyledButton
            inventorySubmit={true}
            mode="contained"
            onPress={handleAddProduct}
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
              <DataTable>
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
            ListFooterComponent={() => <View style={styles.footer} />}
          />
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
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
  },
  tableContainer: {
    backgroundColor: "#212121",
    borderRadius: 10,
    elevation: 10,
  },
  icon: {
    top: 20,
  },
  iconQty: {
    top: 20,
    left: 25,
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
    height: 100, // Espacio para el pie de página de la tabla
  },
  textInput: {
    height: "auto",
    maxWidth: 180,
    width: 180,
    margin: 0,
    height: 50,
  },
});

const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon style={icon != "package" ? styles.icon : styles.iconQty}>
        <Feather name={icon} size={16} color="#fff" />
      </LeftIcon>
      <StyledTextInput
        {...props}
        placeholderTextColor="rgba(221,221,221,0.6)"
      ></StyledTextInput>
    </View>
  );
};

export default InventoryScreen;
