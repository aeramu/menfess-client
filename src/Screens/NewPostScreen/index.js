import React from 'react'
import {ScrollView, View} from 'react-native'
import {Button, Input, Avatar, Divider} from 'react-native-elements'
import {RoundedPost} from '../../Components/PostCard'
import {ProfileContext} from '../../Context'

import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'


const POST_PARENT = gql`
  mutation ($name: String!, $body: String!, $avatar: String!, $parentID: ID){
    postJustPost(name: $name, body: $body, avatar: $avatar, parentID: $parentID){
      id
      body
    }
  }
`
const POST = gql`
  mutation ($name: String!, $avatar: String!, $body: String!){
    postJustPost(name: $name, avatar: $avatar, body: $body){
      id
      body
    }
  }
`

export default ({navigation, route}) => {
  const {profileName, profileAvatar} = React.useContext(ProfileContext)
  const [body, setBody] = React.useState('')

  const [postMutation] = route.params? useMutation(POST_PARENT) : useMutation(POST)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title='Post'
          buttonStyle={{borderRadius:20, paddingHorizontal:20, marginRight:20, height:35, backgroundColor:'#900e66'}} 
          onPress={handlePost}      
        />
      )
    })
  })

  const handlePost = () => {
    postMutation({
      variables:{
        name: profileName,
        avatar: profileAvatar,
        body,
        parentID: route.params? route.params.post.id : null 
      }
    })
    .then(() => {
      navigation.goBack()
    })
  }

  return (
    <ScrollView style={{flex:1, backgroundColor:'white', paddingHorizontal:15, paddingTop:20}}>
      {route.params ? (
        <>
          <RoundedPost post={route.params.post}/>
        </>
      ):(<></>)}
      <View style={{flexDirection:'row', marginTop: 20}}>
        <Avatar
          size={40}
          source={{uri: profileAvatar}}
          rounded 
        />
        <Input
          inputContainerStyle={{borderBottomWidth:0}}
          inputStyle={{fontSize:16}}
          autoFocus={true}
          multiline={true}
          placeholder='Write your post'
          onChangeText={(text) => setBody(text)}
        />
      </View>
    </ScrollView>
  );
}