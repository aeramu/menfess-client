import React from 'react'
import {View, FlatList} from 'react-native'
import {Button, Input, Text, Overlay} from 'react-native-elements'
import Avatar from '../../Components/Avatar'

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
    <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingHorizontal:20, marginBottom:50}}>
      <Text style={{fontSize:25, fontWeight:'bold', marginBottom:40, color:'#900366'}}>
        Create Your Identity
      </Text>
      <Avatar
        uri={avatar}
        size={70}
        showAccessory
        containerStyle={{marginBottom:20}}
        onPress={() => setVisible(true)}
      />
      <Input
        placeholder='Name'
        value={name}
        //autoFocus={true}
        inputContainerStyle={{borderWidth:1, borderRadius:20, paddingHorizontal:15, backgroundColor:'white'}}
        inputStyle={{fontSize:15}}
        autoCapitalize='words'
        onChangeText={(text) => setName(text)}
      />
      <Button
        title='Save'
        buttonStyle={{paddingHorizontal:30, borderRadius: 20, backgroundColor:'#900e66', alignSelf:'flex-end'}}
        onPress={() => {
          setProfile(name, avatar)
          navigation.navigate('Home')
        }}
      />
      <Overlay overlayStyle={{height:400}} isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <FlatList
          numColumns={3}
          data={list}
          renderItem={({item}) => 
            <Avatar
              uri={item}
              containerStyle={{margin:10}}
              size={70}
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