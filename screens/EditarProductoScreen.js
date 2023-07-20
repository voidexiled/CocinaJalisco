// EditarProductoScreen.js

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

import axios from "axios";
import {
  InnerContainer,
  StyledContainer,
  StyledFormArea,
} from "../components/styles";
const EditarProductoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const [productName, setProductName] = useState(product.displayName);
  const [productPrice, setProductPrice] = useState(product.price.toString()); // Convierte el número a cadena
  const [productQty, setProductQty] = useState(product.qty.toString()); // Convierte el número a cadena

  const handleUpdateProduct = async () => {
    if (!productName || !productPrice || !productQty) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const updatedProduct = {
      displayName: productName,
      price: parseInt(productPrice), // Convierte la cadena a número
      qty: parseInt(productQty), // Convierte la cadena a número
    };

    try {
      console.log(updatedProduct);
      const api = `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products/${product.id}`;
      console.log(api);
      await axios.patch(api, updatedProduct); // Actualizar el producto utilizando la API
      navigation.goBack(); // Regresar a la pantalla de inventario
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <StyledContainer>
      <InnerContainer>
        <StyledFormArea>
          <TextInput
            label="Product Name"
            value={productName}
            onChangeText={setProductName}
            placeholder="Nombre del producto"
          />
          <TextInput
            label="Product Price"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
            placeholder="0"
          />
          <TextInput
            label="Quantity"
            value={productQty}
            onChangeText={setProductQty}
            keyboardType="numeric"
            placeholder="0"
          />
          <Button mode="contained" onPress={handleUpdateProduct}>
            Actualizar
          </Button>
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
});

export default EditarProductoScreen;
