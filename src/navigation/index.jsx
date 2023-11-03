import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import CoinDetails from "../screen/CoinDetails";
import BottomNavigator from "./BottomNavigator";
import AddNewAssets from "../screen/AddNewAssets";
const Stack = createNativeStackNavigator();

const Navigation = () => {
return (

  <Stack.Navigator
  >
    <Stack.Screen name="Root" component={BottomNavigator} options={{headerShown: false}}/>
    <Stack.Screen name="CoinDetail" component={CoinDetails} options={{headerShown: false}}/>
    <Stack.Screen name="NewAsset" component={AddNewAssets}  options={{headerShown :false}}/>
  </Stack.Navigator>
);
};

export default Navigation;