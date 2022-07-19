import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import drugsScreen from "./src/screens/drugsScreen";
import drugScreen from "./src/screens/drugScreen";
import ProfileScreen from "./src/screens/profileScreen";
import DetailProfileScreen from "./src/screens/detailProfileScreen";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Fontisto";
import Icon3 from "react-native-vector-icons/FontAwesome5";
import Icon4 from "react-native-vector-icons/MaterialIcons";

import HomeScreen from "./src/screens/homeScreen";
import BotScreen from "./src/screens/botScreen";
import ScheduleScreen from "./src/screens/scheduleScreen";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="drugsScreen" component={drugsScreen} />
      <Stack.Screen name="drugScreen" component={drugScreen} />
    </Stack.Navigator>
  );
};
export { FirstScreenNavigator };

const SecondScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="detailProfileScreen"
        component={DetailProfileScreen}
      />
    </Stack.Navigator>
  );
};
export { SecondScreenNavigator };

const ThirdScreenNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon name="home" size={25} />,
        }}
      />
      <Tab.Screen
        name="Drug"
        component={FirstScreenNavigator}
        options={{
          tabBarIcon: ({ focused }) => <Icon2 name="drug-pack" size={25} />,
        }}
      />
      <Tab.Screen
        name="Bot"
        component={BotScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon3 name="robot" size={25} />,
        }}
      />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon4 name="schedule" size={25} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SecondScreenNavigator}
        options={{
          tabBarIcon: ({ focused }) => <Icon2 name="person" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
};
export { ThirdScreenNavigator };
