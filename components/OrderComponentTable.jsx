import { Text, View } from "react-native";
import React, { memo, useCallback, useState } from "react";
import { VStack } from "native-base";
import { DataTable } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Colors } from "./styles";
const { primary, secondary, tertiary } = Colors;
const OrderComponentTable = ({
  columns,
  ordComponents,
  renderItem,
  styles,
}) => {
  return (
    <VStack
      h={"40%"}
      w={"90%"}
      maxH={"30%"}

      //</Container>bgColor={"#0f0"}
    >
      <FlatList
        style={styles.tableContainer}
        data={ordComponents}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        stickyHeaderIndices={[0]}
        ListHeaderComponentStyle={{
          backgroundColor: "#FF7F50",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        ListHeaderComponent={() => (
          <DataTable styles={styles.datatablee}>
            <DataTable.Header>
              {columns.map((column, index) => (
                <DataTable.Title
                  style={{ flex: 1 }}
                  key={index}
                  numeric={true}
                  {...(index === 0 && { numeric: false, flex: 2 })}
                  {...(index === 1 && { flex: 2 })}
                >
                  <Text style={styles.headerLabelTable}>{column}</Text>
                </DataTable.Title>
              ))}
            </DataTable.Header>
          </DataTable>
        )}
      />
    </VStack>
  );
};

export default memo(OrderComponentTable);
