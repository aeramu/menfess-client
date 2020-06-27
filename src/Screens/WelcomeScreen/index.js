import React from 'react'
import {Text, View, Image} from 'react-native'
import {Button} from 'react-native-elements'
import {ProfileContext} from '../../Context'

export default ({navigation}) => {
  const {setID} = React.useContext(ProfileContext)
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
        onPress={() => {
          let id = ""
          for (let i = 0; i < 24; ++i) {
            id += (Math.floor(Math.random() * 16)).toString(16);
          }
          setID(id)
          console.log(id)
          navigation.navigate('Profile')
        }}
      />
    </View>
  );
}