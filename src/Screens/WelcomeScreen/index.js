import React from 'react'
import {Text, View} from 'react-native'
import {Button} from 'react-native-elements'

export default ({navigation}) => {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:30}}>Welcome to Menfess</Text>
        <Button title='Start' onPress={() => navigation.navigate('Profile')}/>
      </View>
    );
}