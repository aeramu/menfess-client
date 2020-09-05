import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'

import MainStackScreen from './MainStack'
import WelcomeStackScreen from './WelcomeStack'

const RootStack = createStackNavigator()
const RootStackScreen = ({profile}) => {
  return(
    <RootStack.Navigator headerMode='none'>
      {profile ? (
        <RootStack.Screen name='Main' component={MainStackScreen}/>
      ):(
        <RootStack.Screen name='Welcome' component={WelcomeStackScreen}/>
      )}
    </RootStack.Navigator>
  )
}

export default (props) => {
  const {profile} = props
  return (
    <NavigationContainer>
      <RootStackScreen profile={profile}/>
    </NavigationContainer>
  )
}