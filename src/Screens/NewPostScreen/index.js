import React from 'react'
import {ScrollView, View, AsyncStorage} from 'react-native'
import {Button, Input, ListItem, Text} from 'react-native-elements'
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
          buttonStyle={{borderRadius:20, paddingHorizontal:20, marginRight:20, height:35}} 
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
    <ScrollView style={{flex:1, backgroundColor:'white'}}>
      {route.params ? (<RoundedPost post={route.params.post}/>):(<></>)}
      <ListItem
        title={profileName}
        titleStyle={{fontWeight:'bold'}}
        leftAvatar={{source:{uri: profileAvatar}}}
      />
      <Input
        inputContainerStyle={{borderWidth:1, justifyContent:'flex-end', height:200}}
        autoFocus={true}
        multiline={true}
        placeholder='Write your post'
        onChangeText={(text) => setBody(text)}
      />
    </ScrollView>
  );
}