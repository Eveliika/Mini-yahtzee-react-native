import React from 'react';
import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Header from './components/Header';
import Footer from './components/Footer';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
    <Header />
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarStyle: {display: "none"},
            tabBarIcon: () => (
              <MaterialCommunityIcons name='information-variant' color={'#835ad0'} size={30}/>
            ),
            tabBarActiveTintColor: '#835ad0',
            tabBarInactiveTintColor: 'gray'
          }}
        />
        <Tab.Screen 
          name="Gameboard" 
          component={Gameboard} 
          options={{
            tabBarIcon: () => (
               <MaterialCommunityIcons name='dice-multiple' color={'#835ad0'} size={30}/>
            ),
          tabBarActiveTintColor: '#835ad0',
          tabBarInactiveTintColor: 'gray'
          }}
        />
        <Tab.Screen 
          name="Scoreboard" 
          component={Scoreboard}
          options={{
            tabBarIcon: () => (
               <MaterialCommunityIcons name='format-list-numbered' color={'#835ad0'} size={30}/>
            ),
            tabBarActiveTintColor: '#835ad0',
          tabBarInactiveTintColor: 'gray'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    <Footer/>
    </>
  );
}