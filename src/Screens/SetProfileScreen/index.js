import React from 'react'
import {View, FlatList} from 'react-native'
import {Button, Input, Text, Overlay} from 'react-native-elements'
import Avatar from '../../Components/Avatar'

import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

import {ProfileContext} from '../../Context'

const AVATAR_LIST = gql`
  query{
    menfessAvatarList
  }
`
export default ({navigation}) => {
  const [avatarList, setAvatarList] = React.useState([])

  useQuery(AVATAR_LIST,{
    onCompleted(data){
      setAvatarList(data.menfessAvatarList)
    }
  })
  
  const {setProfile, profileName, profileAvatar} = React.useContext(ProfileContext)

  const [name, setName] = React.useState(profileName)
  const [avatar, setAvatar] = React.useState(profileAvatar||'https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg')
  const [visible, setVisible] = React.useState(false)

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center', paddingHorizontal:20, marginBottom:50}}>
      <Text style={{fontSize:25, fontWeight:'bold', marginBottom:40, color:'#900e66'}}>
        Create Your Identity
      </Text>
      <Avatar
        uri={avatar}
        size={80}
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
      <Overlay overlayStyle={{height:350}} isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <FlatList
          numColumns={3}
          data={avatarList}
          keyExtractor={(index) => index}
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