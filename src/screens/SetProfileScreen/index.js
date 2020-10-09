import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Button, Input, Text} from 'react-native-elements'
import {Avatar} from '../../components'
import {AvatarOverlay} from './Components'
import {useQuery, gql} from '@apollo/client'
import {ProfileContext} from '../../context'

export default ({navigation}) => {
  const {setProfile, profileName, profileAvatar} = React.useContext(ProfileContext)
  const [avatarList, setAvatarList] = React.useState([])
  const [name, setName] = React.useState(profileName)
  const [avatar, setAvatar] = React.useState(profileAvatar||'https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg')
  const [visible, setVisible] = React.useState(false)

  useQuery(AVATAR_LIST,{
    onCompleted(data){
      setAvatarList(data.menfessAvatarList)
    }
  })
  
  const handleChooseAvatar = (avatar) => {
    setAvatar(avatar)
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
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
        inputContainerStyle={styles.input}
        inputStyle={{fontSize:15}}
        autoCapitalize='words'
        onChangeText={(text) => setName(text)}
      />
      <Button
        title='Save'
        buttonStyle={styles.button}
        onPress={() => {
          setProfile(name, avatar)
          navigation.navigate('Home')
        }}
      />
      <AvatarOverlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        data={avatarList}
        onPress={(avatar) => handleChooseAvatar(avatar)}
      />
    </View>
  );
}

const AVATAR_LIST = gql`
  query{
    menfessAvatarList
  }
`

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:'center', 
    alignItems:'center', 
    paddingHorizontal:20, 
    marginBottom:50
  },
  text:{
    fontSize:25, 
    fontWeight:'bold', 
    marginBottom:40, 
    color:'#900e66'
  },
  input:{
    borderWidth:1, 
    borderRadius:20, 
    paddingHorizontal:15, 
    backgroundColor:'white'
  },
  button:{
    paddingHorizontal:30, 
    borderRadius: 20, 
    backgroundColor:'#900e66', 
    alignSelf:'flex-end'
  }
})