import React from 'react'
import {View, FlatList} from 'react-native'
import {Button, Input, Avatar, Text, Overlay} from 'react-native-elements'

import {ProfileContext} from '../../Context'

export default ({navigation}) => {
  const {setProfile, profileName, profileAvatar} = React.useContext(ProfileContext)

  const [name, setName] = React.useState(profileName)
  const [avatar, setAvatar] = React.useState(profileAvatar||'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg')
  const [visible, setVisible] = React.useState(false)

  const list = [
    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    'https://qiup-image.s3.amazonaws.com/avatar/bart.jpg',
    'https://qiup-image.s3.amazonaws.com/avatar/buttercup.png',
    'https://qiup-image.s3.amazonaws.com/avatar/homer.jpg',
    'https://qiup-image.s3.amazonaws.com/avatar/jerry.jpeg',
    'https://qiup-image.s3.amazonaws.com/avatar/phantom.jpg',
    'https://qiup-image.s3.amazonaws.com/avatar/pig.jpg',
    'https://qiup-image.s3.amazonaws.com/avatar/powerpuff.jpg',
  ]

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
      <Text>Create your identity</Text>
      <Avatar
        source={{uri: avatar}}
        avatarStyle={{borderRadius:100}}
        size={100}
        showAccessory
        containerStyle={{marginBottom:20}}
        onPress={() => setVisible(true)}
      />
      <Input
        placeholder='Name'
        value={name}
        inputContainerStyle={{borderWidth:1, borderRadius:20, paddingHorizontal:15}}
        inputStyle={{fontSize:15}}
        autoCapitalize='words'
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
      <Overlay overlayStyle={{height:400}} isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <FlatList
          numColumns={2}
          data={list}
          renderItem={({item}) => 
            <Avatar
              source={{uri: item}}
              avatarStyle={{borderRadius:100}}
              containerStyle={{margin:10}}
              size={100}
              onPress={() => {
                setAvatar(item)
                setVisible(false)
              }}
            />
          }
        />
      </Overlay>
    </View>
  );
}