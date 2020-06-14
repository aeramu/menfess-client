import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import {AsyncStorage} from 'react-native'

import RootStackScreen from './src/Navigation'
import {ProfileContext} from './src/Context'
import Splash from './src/Screens/Splash'

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [profile, setProfile] = React.useState()

  const profileContext = React.useMemo(() => {
    return({
      setProfile: async (data) => {
        await AsyncStorage.setItem('profile', data)
        setProfile(data)
      },
      removeProfile: async () => {
        await AsyncStorage.removeItem('profile')
        setProfile(null)
      }
    })
  })

  React.useEffect(() => {
    const checkProfile = async () => {
      const item = await AsyncStorage.getItem('profile')
      setProfile(item)
      setIsLoading(false)
    }
    checkProfile()
  })

  if (isLoading){
    return(
      <Splash/>
    )
  }
  
  return (
    <ProfileContext.Provider value = {profileContext}>
      <NavigationContainer>
        <RootStackScreen profile={profile}/>
      </NavigationContainer>
    </ProfileContext.Provider>
  );
}