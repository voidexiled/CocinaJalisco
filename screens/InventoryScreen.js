import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, DataTable } from "react-native-paper";

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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          label="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          label="Product Price"
          value={productPrice}
          onChangeText={setProductPrice}
        />
        <Button mode="contained" onPress={handleAddProduct}>
          Add Product
        </Button>
      </View>

      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Name</DataTable.Title>
            <DataTable.Title>Price</DataTable.Title>
            <DataTable.Title numeric>Delete</DataTable.Title>
          </DataTable.Header>

          {inventory.map((product, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>{product.name}</DataTable.Cell>
              <DataTable.Cell>{product.price}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Button
                  icon="delete"
                  onPress={() => handleDeleteProduct(index)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
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
});

export default InventoryScreen;
