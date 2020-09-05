import {
    WelcomeScreen,
    SetProfileScreen,
} from '../screens'


const WelcomeStack = createStackNavigator()
export default () => {
  return(
    <WelcomeStack.Navigator headerMode='none'>
      <WelcomeStack.Screen name='Welcome' component={WelcomeScreen}/>
      <WelcomeStack.Screen name='Profile' component={SetProfileScreen}/>
    </WelcomeStack.Navigator>
  )
}