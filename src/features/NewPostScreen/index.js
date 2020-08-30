import React from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {Button, Input} from 'react-native-elements'
import {ProfileContext} from '../../context'
import {Avatar, RoundedPost, NewPostAvatar} from '../../components'

import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'


const POST = gql`
  mutation ($name: String!, $body: String!, $avatar: String!, $parentID: ID, $repostID: ID, $roomID: ID){
    postMenfessPost(name: $name, body: $body, avatar: $avatar, parentID: $parentID, repostID: $repostID, roomID: $roomID){
      id
      parent{
        replyCount
        upvoteCount
        downvoteCount
      }
      repost{
        replyCount
        upvoteCount
        downvoteCount
      }
    }
  }
`

export default ({navigation, route}) => {
  const {profileName, profileAvatar} = React.useContext(ProfileContext)
  const [body, setBody] = React.useState('')
  const [disabled, setDisabled] = React.useState(true)

  const [postMutation] = useMutation(POST)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title='Post'
          buttonStyle={styles.button} 
          disabled={disabled}
          onPress={() => handlePost()}      
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
        parentID: route.params && route.params.post && !route.params.repost 
          ? route.params.post.id 
          : null,
        repostID: route.params && route.params.post && route.params.repost 
          ? route.params.post.id 
          : null,
        roomID: route.params && route.params.roomID 
          ? route.params.roomID 
          : null,
      }
    })
    .then(() => {
      navigation.goBack()
    })
  }

  return (
    <ScrollView style={styles.container}>
      {route.params && route.params.post && !route.params.repost && 
        <>
          <RoundedPost post={route.params.post}/>
          <View style={{marginBottom:20}}/>
        </>
      }
      {/* <View style={{flexDirection:'row'}}> 
        <Avatar
          size={40}
          uri={profileAvatar}
        />*/}
      <NewPostAvatar
        name={profileName}
        uri={profileAvatar}
        room='@General'
      />
        <Input
          containerStyle={{flex:1}}
          inputContainerStyle={{borderBottomWidth:0}}
          inputStyle={{fontSize:16}}
          autoFocus={true}
          multiline={true}
          placeholder='Write your post'
          onChangeText={(text) => {
            setDisabled(text.length == 0)
            setBody(text)
          }}
        />
      {/* </View> */}
      {route.params && route.params.post && route.params.repost && 
        <RoundedPost post={route.params.post}/>
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button:{
    borderRadius:20, 
    paddingHorizontal:20, 
    marginRight:20, 
    height:35, 
    backgroundColor:'#900e66'
  },
  container:{
    flex:1, 
    backgroundColor:'white', 
    paddingHorizontal:15, 
    paddingTop:20
  }
})