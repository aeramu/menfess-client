import React from 'react'
import {View} from 'react-native'
import {Button, Text, Input, Avatar} from 'react-native-elements'

import {ProfileContext} from '../../Context'

export default () => {
  const [name, setName] = React.useState('')

  const {setProfile} = React.useContext(ProfileContext)

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
      <Avatar
        source={{uri:'https://qiup-image.s3.amazonaws.com/profile-photo/default.jpg'}}
        avatarStyle={{borderRadius:100}}
        containerStyle={{marginBottom:20}}
        size={100}
      />
      <Input
        inputContainerStyle={{borderWidth:1, borderRadius:20, paddingHorizontal:15}}
        inputStyle={{fontSize:15}}
        placeholder='Name'
        onChangeText={(text) => setName(text)}
      />
      <Button
        title='NEXT'
        buttonStyle={{paddingHorizontal:30, borderRadius: 20}}
        onPress={() => setProfile(name)}
      />
    </View>
  );
}