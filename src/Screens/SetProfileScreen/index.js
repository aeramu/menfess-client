import React from 'react'
import {View} from 'react-native'
import {Button, Input, Avatar, Text} from 'react-native-elements'

import {ProfileContext} from '../../Context'

export default ({navigation}) => {
  const {setProfile, profileName, profileAvatar} = React.useContext(ProfileContext)

  const [name, setName] = React.useState(profileName)
  const [avatar, setAvatar] = React.useState(profileAvatar||'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg')

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
      <Text>Choose your identity</Text>
      <Avatar
        source={{uri: avatar}}
        avatarStyle={{borderRadius:100}}
        containerStyle={{marginBottom:20}}
        size={100}
      />
      <Input
        inputContainerStyle={{borderWidth:1, borderRadius:20, paddingHorizontal:15}}
        inputStyle={{fontSize:15}}
        autoCapitalize='words'
        value={name}
        placeholder='Name'
        onChangeText={(text) => setName(text)}
      />
      <Button
        title='Save'
        buttonStyle={{paddingHorizontal:30, borderRadius: 20}}
        onPress={() => {
          setProfile(name, avatar)
          navigation.navigate('Home')
        }}
      />
    </View>
  );
}