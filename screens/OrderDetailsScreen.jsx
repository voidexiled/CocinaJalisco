import { View } from "react-native";
import {
  responsiveHeight as rH,
  responsiveWidth as rW,
} from "../utils/responsive";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalPermissionLevel } from "../utils/session";
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
  Popover,
  Input,
  Button,
  useToast,
  Stack,
  IconButton,
  Icon,
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
  const [newProductQty, setNewProductQty] = useState(1);
  // Obtener el parámetro 'rowData' de la ruta para acceder a los datos pasados
  const row = route.params?.rowData || {};
  const users = route.params?.users || {};
  const columns = ["Nombre", "Descripcion", "Precio", "Creado por"];
  const [ovData, setOvData] = useState([]);
  const [displayName, setDisplayName] = useState();
  const [permissionLevel, setPermissionLevel] = useState();
  const [userId, setUserId] = useState();
  const [anottation, setAnottation] = useState("");
  const toast = useToast();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Orden #" + row.id,
    });
    getLocalSession();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      fetchOverview();
    }, 1100);
  }, []);

  useEffect(() => {
    fetchOrderComponents();
  }, []);

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
  const handleFinishOrder = useCallback(() => {}, []);
  const handleUpdateOverview = useCallback(() => {}, []);

  const handleAddNewProduct = useCallback(() => {
    // newProduct
    // newProductQty

    const newProductObj = {
      orderId: row.id,
      createdBy: userId,
      displayName: newProduct,
      qty: Number(newProductQty),
      description: anottation,
    };
    console.log("Objeto nuevo: ", newProductObj);

    try {
      const response = axios.post(
        "https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders/components",
        newProductObj
      );
      fetchOverview();
      fetchOrderComponents();
      console.log("Producto agregado con éxito:", response);
      showAlert("Producto agregado con éxito", "success");
    } catch (error) {
      console.log("Error al agregar el nuevo producto:", error);
      showAlert("Error al agregar el nuevo producto", "error");
    }
  }, [newProduct, newProductQty, row.id, userId, fetchOverview, anottation]);

  const fetchOverview = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/orders/${row.id}/components`
      );
      let temp = [];
      const dataOrder = response.data;
      fetchInventory();
      dataOrder.map((item) => {
        temp.push({
          id: item.id,
          name: item.displayName,
          qty: item.qty,
          price: inventory.find((i) => i.displayName === item.displayName)
            .price,
        });
      });
      temp.push({
        id: "total",
        name: "Total",
        qty: dataOrder.reduce((a, b) => a + b.qty, 0),
        price: dataOrder.reduce(
          (a, b) =>
            a +
            inventory.find((i) => i.displayName === b.displayName).price *
              b.qty,
          0
        ),
      });

      setOvData(temp);
    } catch (error) {
      console.log(error);
    }
  }, []);

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

  const loadData = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const getLocalUserId = useCallback(async () => {
    try {
      const sessionDataString = await AsyncStorage.getItem("sessionData");
      if (sessionDataString !== null) {
        const sessionData = JSON.parse(sessionDataString);
        return sessionData.id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener los datos de sesión5:", error);
    }
  }, []);

  const renderItem = ({ item }) => (
    <DataTable.Row
      onPress={() => handleOpenRowOrder(item)}
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
  );

  return (
    <AppContainer
      colorMode={colorMode}
      insets={insets}
      alignItems={"center"}
      bagColor={"#fff"}
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
          h={"60%"}
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
            <Heading color={"#fff"} fontSize={rW(24)}>
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
            maxH={"10%"}
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
            ovData={ovData}
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
    fontSize: rW(16),
  },
  childValue: {
    color: "#fff",
    fontSize: rW(16),
  },
  datatablee: {
    height: "100%",
    backgroundColor: "#000",
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
