import React from 'react';
import { createStackNavigator} from '@react-navigation/stack'
import Home from '../Screens/Home'
import Post from '../Screens/Post'
import PostForm from '../Screens/PostForm'
import SetProfile from '../Screens/SetProfile'

const MainStack = createStackNavigator()

const MainStackScreen = () => {
  return(
    <MainStack.Navigator>
      <MainStack.Screen name='Home' component={Home}/>
      <MainStack.Screen name='Post' component={Post}/>
      <MainStack.Screen name='PostForm' component={PostForm}/>
    </MainStack.Navigator>
  )
}

const ProfileStack = createStackNavigator()

const ProfileStackScreen = () => {
  return(
    <ProfileStack.Navigator headerMode='none'>
      <ProfileStack.Screen name='Profile' component={SetProfile}/>
    </ProfileStack.Navigator>
  )
}

const RootStack = createStackNavigator()

export default RootStackScreen = ({profile}) => {
  return(
    <RootStack.Navigator headerMode='none'>
      {profile ? (
        <RootStack.Screen name='Main' component={MainStackScreen}/>
      ):(
        <RootStack.Screen name='Profile' component={ProfileStackScreen}/>
      )}
    </RootStack.Navigator>
  )
}