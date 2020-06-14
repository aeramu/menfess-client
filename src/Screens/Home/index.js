import React from 'react'
import { Text, View } from 'react-native'
import {Button} from 'react-native-elements'

import {ProfileContext} from '../../Context'

export default ({navigation}) => {
    const {removeProfile} = React.useContext(ProfileContext)

    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>Home</Text>
        <Button
          title='New Post'
          onPress={()=>navigation.navigate('PostForm')}
        />
        <Button
          title='Log Out'
          onPress={() => removeProfile()}
        />
      </View>
    );
}