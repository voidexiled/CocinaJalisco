import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
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

const InventoryScreen = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [inventory, setInventory] = useState([]);

  const handleAddProduct = () => {
    if (productName && productPrice) {
      setInventory([...inventory, { name: productName, price: productPrice }]);
      setProductName("");
      setProductPrice("");
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedInventory = [...inventory];
    updatedInventory.splice(index, 1);
    setInventory(updatedInventory);
  };

  const handleEditProduct = (index) => {
    // Lógica para editar el producto en el índice proporcionado
    // Aquí puedes abrir una pantalla/modal para editar el producto
    console.log("Edit product at index:", index);
  };

  const renderItem = ({ item, index }) => (
    <DataTable.Row key={index}>
      <DataTable.Cell>{item.name}</DataTable.Cell>
      <DataTable.Cell>{item.price}</DataTable.Cell>
      <DataTable.Cell numeric>
        <Button icon="delete" onPress={() => handleDeleteProduct(index)} />
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <Button icon="pencil" onPress={() => handleEditProduct(index)} />
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
          <MyTextInput
            icon={"dollar-sign"}
            productprice={true}
            label="Product Price"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
            placeholder="00.00"
          />
          <StyledButton
            inventorySubmit={true}
            mode="contained"
            onPress={handleAddProduct}
          >
            <ButtonText style={styles.buttonLabel}>Add Product</ButtonText>
          </StyledButton>

          <FlatList
            data={inventory}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title textStyle={styles.headerLabelTable}>
                    Nombre
                  </DataTable.Title>
                  <DataTable.Title textStyle={styles.headerLabelTable}>
                    Precio
                  </DataTable.Title>
                  <DataTable.Title numeric textStyle={styles.headerLabelTable}>
                    Eliminar
                  </DataTable.Title>
                  <DataTable.Title numeric textStyle={styles.headerLabelTable}>
                    Editar
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
  tableContainer: {
    flex: 1,
  },
  icon: {
    top: 20,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 20,
  },
  headerLabelTable: {
    fontSize: 14,
    color: "#000",
  },
  deleteIcon: {
    color: "#000",
  },
  footer: {
    height: 100, // Espacio para el pie de página de la tabla
  },
});

const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon style={styles.icon}>
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
