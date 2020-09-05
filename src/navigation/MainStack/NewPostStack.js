import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import {
  NewPostScreen,
  RoomChooseScreen
} from '../../screens'

const NewPostStack = createStackNavigator()
export default () => {
  return(
    <NewPostStack.Navigator>
      <NewPostStack.Screen name='NewPost' component={NewPostScreen}/>
      <NewPostStack.Screen name='RoomChoose' component={RoomChooseScreen}/>
    </NewPostStack.Navigator>
  )
}