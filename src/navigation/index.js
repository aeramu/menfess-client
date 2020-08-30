import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {View, Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import {Avatar} from '../components'
import {ProfileContext} from '../context'

import {
  HomeScreen,
  PostScreen,
  NewPostScreen,
  SetProfileScreen,
  WelcomeScreen,
  RoomListScreen,
  RoomScreen,
  NotificationsScreen,
  RoomChooseScreen
} from '../features'

const NewPostStack = createStackNavigator()
const NewPostStackScreen = () => {
  return(
    <NewPostStack.Navigator>
      <NewPostStack.Screen name='NewPost' component={NewPostScreen}/>
      <NewPostStack.Screen name='RoomChoose' component={RoomChooseScreen}/>
    </NewPostStack.Navigator>
  )
}

const MainTabs = createBottomTabNavigator()
const MainTabsScreen = () => {
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

const MainStack = createStackNavigator()

const MainStackScreen = () => {
  const {profileAvatar} = React.useContext(ProfileContext)
  return(
    <MainStack.Navigator>
      <MainStack.Screen 
        name='Tabs' 
        component={MainTabsScreen} 
        options={({navigation}) => ({
        title:'',
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
        headerRight: () => (
          <Avatar
            uri={profileAvatar}
            size={38}
            containerStyle={{marginRight:20}}
            onPress={() => navigation.navigate('Profile')}     
          />
        )
      })}/>
      <MainStack.Screen name='Post' component={PostScreen}/>
      <MainStack.Screen name='NewPost' component={NewPostStackScreen} options={{
        title: ''
      }}/>
      <MainStack.Screen name='Profile' component={SetProfileScreen}/>
      <MainStack.Screen name='Room' component={RoomScreen} options={
        ({route}) => ({
          title:route.params.room.name
        })
      }/>
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