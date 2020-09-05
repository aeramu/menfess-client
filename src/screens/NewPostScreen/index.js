import React from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'
import {Button, Input} from 'react-native-elements'
import {ProfileContext} from '../../context'
import {RoundedPost, NewPostAvatar} from '../../components'

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
  },[navigation, disabled])

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
        roomID: route.params && route.params.room
          ? route.params.room.id
          : null,
      }
    })
    .then(() => {
      navigation.goBack()
    })
  }

  const room = route.params && route.params.room
    ? route.params.room.name
    : 'General'

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
      {route.params && route.params.post && !route.params.repost && 
        <>
          <RoundedPost post={route.params.post}/>
          <View style={{marginBottom:20}}/>
        </>
      }
      <NewPostAvatar
        name={profileName}
        uri={profileAvatar}
        room={'@' + room}
        onRoomPress={() => navigation.navigate('RoomChoose')}
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
          console.log(disabled)
        }}
      />
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