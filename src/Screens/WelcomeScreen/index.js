import React from 'react'
import {Text, View, Image} from 'react-native'
import {Button} from 'react-native-elements'

export default ({navigation}) => {

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text style={{fontSize:20, color:'#900e66', marginBottom:20}}>Welcome to</Text>
      <Image
        style={{height:240, width:240}}
        source={require('../../../assets/splash.png')}
        resizeMode='contain'
      />
      <Button 
        title='Start'
        containerStyle={{marginTop:50}}
        buttonStyle={{paddingHorizontal:40, borderRadius:20, backgroundColor:'#900e66'}} 
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}