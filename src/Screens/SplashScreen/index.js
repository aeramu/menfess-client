import React from 'react'
import {Text, View, ActivityIndicator} from 'react-native'

export default () => {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={50}/>
        <Text>Splash Screen</Text>
      </View>
    );
}