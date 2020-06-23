import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {View, Image} from 'react-native'
import Avatar from '../Components/Avatar'
import {ProfileContext} from '../Context'

import HomeScreen from '../Screens/HomeScreen'
import PostScreen from '../Screens/PostScreen'
import NewPostScreen from '../Screens/NewPostScreen'
import SetProfileScreen from '../Screens/SetProfileScreen'
import WelcomeScreen from '../Screens/WelcomeScreen'

const MainStack = createStackNavigator()

const MainStackScreen = () => {
  const {profileAvatar} = React.useContext(ProfileContext)
  return(
    <MainStack.Navigator>
      <MainStack.Screen name='Home' component={HomeScreen} options={{
        title: '',
        headerLeft: () => (
          <View style={{flexDirection:'row'}}>
            <Image
              source={require('../../assets/icon.png')}
              style={{marginLeft:20, marginRight:10, height:25, width:25}}
              resizeMode='contain'
            />
            <Image
              source={require('../../assets/menfess.png')}
              style={{height:25, width:80}}
              resizeMode='contain'
            />
          </View>
        ),
        // headerRight: () => (
        //   <Avatar
        //     uri={profileAvatar}
        //     size={30}
        //     containerStyle={{marginRight:20}}
        //     onPress={() => navigation.navigate('Profile')}     
        //   />
        // )
      }}/>
      <MainStack.Screen name='Post' component={PostScreen}/>
      <MainStack.Screen name='NewPost' component={NewPostScreen} options={{
        title: ''
      }}/>
      <MainStack.Screen name='Profile' component={SetProfileScreen} headerMode='none'/>
    </MainStack.Navigator>
  )
}

const WelcomeStack = createStackNavigator()

const WelcomeStackScreen = () => {
  return(
    <WelcomeStack.Navigator headerMode='none'>
      <WelcomeStack.Screen name='Welcome' component={WelcomeScreen}/>
      <WelcomeStack.Screen name='Profile' component={SetProfileScreen}/>
    </WelcomeStack.Navigator>
  )
}

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