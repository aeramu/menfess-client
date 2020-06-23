import React from 'react';
import {AsyncStorage} from 'react-native'
import {ApolloProvider} from '@apollo/react-hooks'
import {AppLoading} from 'expo'
import {Asset} from 'expo-asset'

import {client} from './src/Config/Graphql';
import {ProfileContext} from './src/Context'

import Navigator from './src/Navigation'

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [name, setName] = React.useState()
  const [avatar, setAvatar] = React.useState()

  const ProfileMemo = React.useMemo(() => {
    return({
      setProfile: async (name, avatar) => {
        await AsyncStorage.setItem('name', name)
        await AsyncStorage.setItem('avatar', avatar)
        setName(name)
        setAvatar(avatar)
      },
      removeProfile: async () => {
        await AsyncStorage.removeItem('name')
        await AsyncStorage.removeItem('avatar')
        setName(null)
        setAvatar(null)
      },
      profileName: name,
      profileAvatar: avatar,
    })
  })

  React.useEffect(() => {
    const checkProfile = async () => {
      const name = await AsyncStorage.getItem('name')
      const avatar = await AsyncStorage.getItem('avatar')
      await Asset.loadAsync([
        require('./assets/splash.png'),
        require('./assets/menfess.png'),
        require('./assets/icon.png'),
      ])
      setName(name)
      setAvatar(avatar)
      setIsLoading(false)
    }
    checkProfile()
  },[])

  if (isLoading){
    return(
      <AppLoading/>
    )
  }
  
  return (
    <ApolloProvider client={client}>
      <ProfileContext.Provider value = {ProfileMemo}>
        <Navigator profile={name}/>
      </ProfileContext.Provider>  
    </ApolloProvider>
  );
}