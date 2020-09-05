import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  HomeScreen,
  RoomListScreen,
  NotificationsScreen,
} from '../../screens'

const MainTabs = createBottomTabNavigator()
export default () => {
  return(
    <MainTabs.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused 
              ? 'home-variant'
              : 'home-variant-outline'
              return <MaterialCommunity name={iconName} size={size} color={color} />;
          } else if (route.name === 'RoomList') {
            iconName = focused 
              ? 'door-open'
              : 'door-closed'
              return <MaterialCommunity name={iconName} size={size} color={color}/>
          } else if (route.name === 'Notifications'){
            iconName = focused
              ? 'ios-notifications'
              : 'ios-notifications-outline'
              return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: '#900e66',
        inactiveTintColor: 'gray',
      }}
      backBehavior='initialRoute'
    >
      <MainTabs.Screen name='RoomList' component={RoomListScreen} options={{
        title:'Room'
      }}/>
      <MainTabs.Screen name='Home' component={HomeScreen}/>
      <MainTabs.Screen name='Notifications' component={NotificationsScreen}/>
    </MainTabs.Navigator>
  )
}