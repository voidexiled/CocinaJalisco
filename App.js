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
import Login from "./screens/Login";
import Home from "./screens/Home";
import InventoryScreen from "./screens/InventoryScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const renderScene = ({ route, jumpTo }) => {
  switch (route.key) {
    case "home":
      return <Home />;
    case "inventory":
      return <InventoryScreen />;
    default:
      return <Home />;
  }
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: Colors.accent }}
    style={{ backgroundColor: "#fff" }}
    activeColor={Colors.accent}
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
      return <Ionicons name={iconName} size={26} color={color} />;
    }}
    pressColor="#e9e1e9"
  />
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
          options={{
            ...TransitionPresets.SlideFromRight, // Agrega la transición de Slide desde la derecha
          }}
        />
        {/* Aquí puedes agregar más pantallas */}
      </Stack.Navigator>
    </NavigationContainer>
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
  {
    /*
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}
      activeColor={colors.primary}
      inactiveColor={colors.tertiary}
      swipeEnabled={true} // Habilitar el gesto de deslizar hacia los lados
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={26} color={color} />
          ),
        }}
      />

    </Tab.Navigator>*/
  }
};

export default App;
