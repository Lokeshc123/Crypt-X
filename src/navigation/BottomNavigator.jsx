import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import { Entypo, FontAwesome,Foundation} from '@expo/vector-icons';
import WatchList from '../screen/WatchList';
import News from '../screen/News';
import Portfolio from '../screen/Portfolio';
const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: '#181818',
       
        },
    }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({focused , color }) => <Entypo name="home" size={focused ? 30 : 25} color={color} />
        }}          />
        <Tab.Screen name="Watchlist" component={WatchList } options={{
            tabBarIcon: ({focused , color }) => <FontAwesome name="star" size={focused ? 30 : 25} color={color} />
        }}          />
          <Tab.Screen name="Portfolio" component={Portfolio} options={{
              tabBarIcon: ({focused , color }) => <Foundation name="graph-pie" size={focused ? 30 : 25} color={color} />
          }}          />
        <Tab.Screen name="News" component={News} options={{
            tabBarIcon: ({focused , color }) => <FontAwesome name="newspaper-o" size={focused ? 30 : 25} color={color} />
        }}          />
      
    </Tab.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({})