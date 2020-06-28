import React from 'react';
import {AsyncStorage} from 'react-native'
import {ApolloProvider} from '@apollo/react-hooks'
import {AppLoading} from 'expo'
import {Asset} from 'expo-asset'
import {CacheManager} from 'react-native-expo-image-cache'

import {client} from './src/Config/Graphql';
import {ProfileContext} from './src/Context'

import Navigator from './src/Navigation'

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [id, setId] = React.useState()
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
      setID: async (id) => {
        await AsyncStorage.setItem('id', id)
        setId(id)
      },
      //remove profile for mock
      removeProfile: async () => {
        await AsyncStorage.removeItem('id')
        await AsyncStorage.removeItem('name')
        await AsyncStorage.removeItem('avatar')
        setId(null)
        setName(null)
        setAvatar(null)
      },
      profileID: id,
      profileName: name,
      profileAvatar: avatar,
    })
  })

  React.useEffect(() => {
    const checkProfile = async () => {
      const id = await AsyncStorage.getItem('id')
      const name = await AsyncStorage.getItem('name')
      const avatar = await AsyncStorage.getItem('avatar')
      setId(id)
      setName(name)
      setAvatar(avatar)
      setIsLoading(false)
    }
    checkProfile()
  },[])

  React.useEffect(() => {
    const avatarList = [
      "https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/upin.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/spiderman.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/saitama.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/ronald.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/mrbean.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/monalisa.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/kaonashi.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/ipin.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/einstein.jpg",
      "https://qiup-image.s3.amazonaws.com/avatar/batman.jpg",
    ]    
    const loadImage = async() => {
      await Asset.loadAsync([
        require('./assets/splash.png'),
        require('./assets/menfess.png'),
        require('./assets/icon.png'),
      ])
      const avatarPromises = avatarList.map(async (uri) => {
        const promise = await CacheManager.get(uri).getPath()
        return promise
      })
      await Promise.all(avatarPromises)
    }
    loadImage()
  },[])

  if (isLoading){
    return(
      <AppLoading/>
    )
  }
  
  return (
    <ApolloProvider client={client}>
      <ProfileContext.Provider value = {ProfileMemo}>
        <Navigator profile={id && name && avatar}/>
      </ProfileContext.Provider>  
    </ApolloProvider>
  );
}