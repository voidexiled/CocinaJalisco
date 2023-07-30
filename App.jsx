import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Provider } from "react-native-paper";

// Screens
import { InventoryProvider } from "./components/context/InventoryContext";
import LoginScreen from "./screens/LoginScreen";
import MainTabNavigatorScreen from "./screens/MainTabNavigatorScreen";
import EditarProductoScreen from "./screens/EditarProductoScreen";

import OrdersScreen from "./screens/OrdersScreen";
const Stack = createStackNavigator();
import {
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

// NATIVE BASE
import { NativeBaseProvider, Text, Box } from "native-base";

import { LogBox } from "react-native";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
LogBox.ignoreLogs([
  "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
]);
const App = () => {
  const insets = useSafeAreaInsets();

  return (
    <NativeBaseProvider>
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
              name="MainTabNavigatorScreen"
              component={MainTabNavigatorScreen}
              options={{
                ...TransitionPresets.FadeFromBottomAndroid, // Agrega la transición de Slide desde la derecha
              }}
            />
            <Stack.Screen
              name="EditarProductoScreen"
              component={EditarProductoScreen}
              options={{ title: "Editar Producto" }}
            />
            <Stack.Screen
              name="OrderDetailsScreen"
              component={OrderDetailsScreen}
              options={{
                title: "Detalles de orden",
                ...TransitionPresets.FadeFromBottomAndroid,
              }}
            />

            {/* Aquí puedes agregar más pantallas */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </NativeBaseProvider>
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
