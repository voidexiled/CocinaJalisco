import React, { useState, memo, useCallback } from "react";

import { useTheme } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { Colors } from "../components/styles";
import HomeScreen from "./HomeScreen";
import InventoryScreen from "./InventoryScreen";
import OrdersScreen from "./OrdersScreen";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Text, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
import { InnerContainer } from "../components/styles";
import { Ionicons } from "@expo/vector-icons";

const MainTabNavigatorScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", title: "Configuracion" },
    { key: "orders", title: "Pedidos" },
    { key: "inventory", title: "Inventario" },
  ]);

  const renderScene = useCallback(({ route, jumpTo }) => {
    switch (route.key) {
      case "home":
        return <HomeScreen />;
      case "orders":
        return <OrdersScreen />;
      case "inventory":
        return <InventoryScreen />;

      default:
        return <HomeScreen />;
    }
  }, []);

  const renderTabBar = useCallback(
    (props) => (
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

          height: 60 + insets.bottom,
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
              iconName = focused ? "settings" : "settings-outline";
              break;
            case "orders":
              iconName = focused ? "cart" : "cart-outline";
              break;
            case "inventory":
              iconName = focused ? "desktop" : "desktop-outline";
              break;
            default:
              iconName = "circle";
          }
          return <Ionicons name={iconName} size={20} color={color} />;
        }}
        pressColor="#e9e1e9"
      />
    ),
    []
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{
        width: layout.width,
      }}
      tabBarPosition="bottom"
      renderTabBar={renderTabBar}
      initialParams={{ navigation }}
    />
  );
};

export default memo(MainTabNavigatorScreen);
