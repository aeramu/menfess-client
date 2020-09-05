import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {Avatar} from '../../components'
import {ProfileContext} from '../../context'

import {
  PostScreen,
  SetProfileScreen,
  RoomScreen,
  NewPostScreen,
  RoomChooseScreen
} from '../../screens'
import MainTabsScreen from './MainTabs'

import HeaderLogo from './components/HeaderLogo'

const MainStack = createStackNavigator()
export default () => {
  const {profileAvatar} = React.useContext(ProfileContext)
  return(
    <MainStack.Navigator>
        <MainStack.Screen 
            name='Tabs' 
            component={MainTabsScreen} 
            options={({navigation}) => ({
                title:'',
                headerLeft: () => (
                    <HeaderLogo/>
                ),
                headerRight: () => (
                    <Avatar
                        uri={profileAvatar}
                        size={38}
                        containerStyle={{marginRight:20}}
                        onPress={() => navigation.navigate('Profile')}     
                    />
                )
            })}
        />
        <MainStack.Screen name='Post' component={PostScreen}/>
        <MainStack.Screen name='NewPost' component={NewPostScreen} options={{
            title:''
        }}/>
        <MainStack.Screen name='RoomChoose' component={RoomChooseScreen} options={{
            title:''
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