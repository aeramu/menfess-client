import React from 'react'
import {ScrollView, View, AsyncStorage} from 'react-native'
import {Button, Input, Avatar, Text} from 'react-native-elements'

import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'


const POST = gql`
  mutation ($name: String!, $body: String!){
    postJustPost(name: $name, body: $body){
      id
      body
    }
  }
`

export default ({navigation}) => {
  const [body, setBody] = React.useState('')
  const [name, setName] = React.useState('')

  const [postMutation] = useMutation(POST)

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
      }
    })
    .then(() => {
      navigation.navigate('Home')
    })
  }

  React.useEffect(() => {
    const getName = async () => {
      const profile = await AsyncStorage.getItem('profile')
      setName(profile)
    }
    getName()
  })

  return (
    <ScrollView style={{flex:1, paddingTop:20, paddingHorizontal:20, backgroundColor:'white'}}>
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <Avatar
          source={{uri:'https://qiup-image.s3.amazonaws.com/profile-photo/default.jpg'}}
          avatarStyle={{borderRadius:100}}
          containerStyle={{marginBottom:20}}
          size={100}
        />
        <Text style={{fontSize:40}}>
          {name}
        </Text>
      </View>
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