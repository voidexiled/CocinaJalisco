import { StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//icons
import { Feather, Ionicons, Fontisto } from "@expo/vector-icons";
import { Colors } from "./components/styles";
import { useTheme } from "@react-navigation/native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-native-paper";

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

// Screens
import { InventoryProvider } from "./components/InventoryContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import InventoryScreen from "./screens/InventoryScreen";
import EditarProductoScreen from "./screens/EditarProductoScreen";
const Stack = createStackNavigator();

const renderScene = ({ route, jumpTo }) => {
  switch (route.key) {
    case "home":
      return <HomeScreen />;
    case "inventory":
      return <InventoryScreen />;
    default:
      return <HomeScreen />;
  }
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: Colors.accent,
      top: 0,
      borderRadius: 10,
    }}
    renderIndicator={() => null}
    style={{
      backgroundColor: "#fff",
      elevation: 25,

      height: 60,
    }}
    activeColor={Colors.primary}
    inactiveColor={Colors.tertiary}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color }}>{route.title}</Text>
    )}
    renderIcon={({ route, focused, color }) => {
      let iconName;
      switch (route.key) {
        case "home":
          iconName = focused ? "home" : "home-outline";
          break;
        case "inventory":
          iconName = focused ? "list" : "list-outline";
          break;
        default:
          iconName = "circle";
      }
      return <Ionicons name={iconName} size={20} color={color} />;
    }}
    pressColor="#e9e1e9"
  />
);

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.FadeFromBottomAndroid,
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />

          <Stack.Screen
            name="MainTabNavigator"
            component={MainTabNavigator}
            options={{
              ...TransitionPresets.SlideFromRight, // Agrega la transición de Slide desde la derecha
            }}
          />
          <Stack.Screen
            name="EditarProductoScreen"
            component={EditarProductoScreen}
            options={{ title: "Editar Producto" }}
          />

          {/* Aquí puedes agregar más pantallas */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const MainTabNavigator = ({ navigation }) => {
  const { colors } = useTheme();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Principal" },
    { key: "inventory", title: "Inventario" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="bottom"
      renderTabBar={renderTabBar}
      initialParams={{ navigation }}
    />
  );
};

export default () => {
  return (
    <Provider>
      <InventoryProvider>
        <App />
      </InventoryProvider>
    </Provider>
  );
};
