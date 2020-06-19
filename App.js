import React from 'react';
import {AsyncStorage} from 'react-native'
import {ApolloProvider} from '@apollo/react-hooks'

import {client} from './src/Config/Graphql';
import {ProfileContext} from './src/Context'

import Navigator from './src/Navigation'
import SplashScreen from './src/Screens/SplashScreen'

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [profile, setProfile] = React.useState()

  const ProfileMemo = React.useMemo(() => {
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
      <SplashScreen/>
    )
  }
  
  return (
    <ApolloProvider client={client}>
      <ProfileContext.Provider value = {ProfileMemo}>
        <Navigator profile={profile}/>
      </ProfileContext.Provider>  
    </ApolloProvider>
  );
}