import React from 'react'
import {ScrollView, View, AsyncStorage} from 'react-native'
import {Button, Input, ListItem, Text} from 'react-native-elements'

import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'


const POST_PARENT = gql`
  mutation ($name: String!, $body: String!, $parentID: ID){
    postJustPost(name: $name, body: $body, parentID: $parentID){
      id
      body
    }
  }
`
const POST = gql`
  mutation ($name: String!, $body: String!){
    postJustPost(name: $name, body: $body){
      id
      body
    }
  }
`

export default ({navigation, route}) => {
  const [body, setBody] = React.useState('')
  const [name, setName] = React.useState('anonymous')

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
        name,
        body,
        parentID: route.params? route.params.post.id : null 
      }
    })
    .then(() => {
      navigation.goBack()
    })
  }

  React.useEffect(() => {
    const getName = async () => {
      const profile = await AsyncStorage.getItem('profile')
      setName(profile)
    }
    getName()
  },[])

  return (
    <ScrollView style={{flex:1, backgroundColor:'white'}}>
      <ListItem
        title={name}
        titleStyle={{fontWeight:'bold'}}
        leftAvatar={{source:{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}}
      />
      <Input
        inputContainerStyle={{borderWidth:1, justifyContent:'flex-end',height:200}}
        autoFocus={true}
        multiline={true}
        placeholder='Write your post'
        onChangeText={(text) => setBody(text)}
      />
    </ScrollView>
  );
}