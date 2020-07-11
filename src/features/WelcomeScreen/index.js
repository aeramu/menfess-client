import React from 'react'
import {
  Text,
  View, 
  Image, 
  StyleSheet,
} from 'react-native'
import {Button} from 'react-native-elements'
import {ProfileContext} from '../../context'

export default ({navigation}) => {
  const {setID} = React.useContext(ProfileContext)

  const generateID = () => {
    let id = ""
    for (let i = 0; i < 24; ++i) {
      id += (Math.floor(Math.random() * 16)).toString(16);
    }
    return id
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to</Text>
      <Image
        style={styles.image}
        source={require('../../../assets/splash.png')}
        resizeMode='contain'
      />
      <Button 
        title='Start'
        containerStyle={{marginTop:50}}
        buttonStyle={styles.button} 
        onPress={() => {
          setID(generateID())
          navigation.navigate('Profile')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
    justifyContent:'center', 
    alignItems:'center',
  },
  text:{
    fontSize:20, 
    color:'#900e66', 
    marginBottom:20,
  },
  image:{
    height:240, 
    width:240,
  },
  button:{
    paddingHorizontal:40, 
    borderRadius:20, 
    backgroundColor:'#900e66',
  }
})