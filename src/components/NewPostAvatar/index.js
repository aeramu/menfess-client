import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar } from '../Avatar'
import Icon from 'react-native-vector-icons/AntDesign'

export default ({name, uri, room, onRoomPress}) => {
    return(
        <View style={styles.container}>
            <Avatar
                uri={uri}
                size={50}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <TouchableOpacity style={styles.room} onPress={() => onRoomPress()}>
                    <Text style={styles.roomText}>{room}</Text>
                    <Icon
                        name='caretdown'
                        color='grey'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    textContainer:{
        marginLeft:10,
    },
    name:{
        fontWeight:'bold', 
        fontSize:16,
    },
    room:{
        borderWidth:1,
        borderRadius:8,
        borderColor:'grey',
        paddingHorizontal:5,
        paddingVertical:2,
        flexDirection:'row',
        alignItems:'center'
    },
    roomText:{
        color:'grey',
        marginRight:5
    }
})