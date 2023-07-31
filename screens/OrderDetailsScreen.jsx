import { View } from "react-native";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
import React, {
  Component,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import AppContainer from "../components/AppContainer";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Container,
  VStack,
  HStack,
  Text,
  useColorMode,
  Center,
  Heading,
  Divider,
  Box,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { FlatList, Skeleton } from "native-base";
import { Colors, Dark } from "../components/styles";
import { getLocalTime } from "../utils/util";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import ProductSelect from "../components/ProductSelect";
import QtySelect from "../components/QtySelect";
import OverviewOrder from "../components/OverviewOrder";
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
  const [newProduct, setNewProduct] = useState("key0");
  // Obtener el parámetro 'rowData' de la ruta para acceder a los datos pasados
  const row = route.params?.rowData || {};
  const users = route.params?.users || {};
  const columns = ["Nombre", "Cantidad", "Precio", "Creado por"];
  const ovData = [
    { name: "Tamal de puerco x2", value: "$30" },
    { name: "Tamal de picadillo x3", value: "$45" },
  ];

  const fetchInventory = useCallback(async () => {
    const response = await fetch(
      "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/products"
    );
    const data = await response.json();
    console.log(data);
    setInventory(data);
  }, []);

  const loadData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchInventory();
    fetchOrderComponents();
    console.log(row);
    console.log(users);
  }, []);

  const fetchOrderComponents = useCallback(async () => {
    const response = await fetch(
      `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders/${row.id}/components`
    );
    const data = await response.json();
    console.log(data);
    setOrdComponents(data);
  }, []);

  const renderItem = ({ item }) => (
    <DataTable.Row
      onPress={() => handleOpenRowOrder(item)}
      backgroundColor={colorMode === "light" ? background : background}
    >
      <DataTable.Cell textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            w={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
          item.displayName
        )}
      </DataTable.Cell>

      <DataTable.Cell numeric textStyle={styles.labelTable} style={{ flex: 1 }}>
        {loading ? (
          <Skeleton
            endColor="warmGray.500"
            width={12}
            h={3}
            rounded={20}
          ></Skeleton>
        ) : (
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
  );

  return (
    <AppContainer
      colorMode={colorMode}
      insets={insets}
      alignItems={"center"}
      bagColor={"#fff"}
    >
      <Container h="100%" minW="100%" bgColor={"success.100"}></Container>
      {/* BOTTOM CONTAINER  */}
      <VStack
        position={"absolute"}
        bottom={0}
        left={0}
        w={"100%"}
        h={"60%"}
        flexShrink={0}
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
          <Heading color={"#fff"} fontSize={rW(30)}>
            {"Orden de " + row.name}
          </Heading>
        </VStack>
        <VStack w={"100%"} h={"15%"}>
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
          maxH={"10%"}
          justifyContent={"space-evenly"}
        >
          <ProductSelect
            inventory={inventory}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
          />
          <QtySelect />
        </HStack>
        <OverviewOrder ovData={ovData}></OverviewOrder>
      </VStack>
    </AppContainer>
  );
};

const Detail = ({ header, child }) => {
  return (
    <>
      <HStack>
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
    fontSize: rW(20),
  },
  childValue: {
    color: "#fff",
    fontSize: rW(16),
  },
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
    paddingTop: 24,
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
    fontSize: rW(14),
    color: tertiary,
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

export default memo(OrderDetailsScreen);
