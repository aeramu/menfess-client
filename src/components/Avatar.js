import React from 'react'
import {Image} from 'react-native-expo-image-cache'
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Avatar = (props) => {
    const {uri, size, onPress, containerStyle, showAccessory} = props
    return(
        <TouchableOpacity 
            style={containerStyle} 
            onPress={() => onPress()}
            activeOpacity={0.5}
        >
            <Image
                uri={uri}
                style={{height:size, width:size, borderRadius:size}}
            />
            {showAccessory && 
                <Icon
                    name='mode-edit' 
                    style={styles.accessory}
                    size={20}
                    color='white'
                />
            }
        </TouchableOpacity>
    )
}

export const AvatarCard = ({title, avatar, subtitle, style}) => {
    return(
        <View style={{flexDirection:'row', ...style}}>
            <Avatar
                uri={avatar.uri} 
                size={40}
                onPress={() => {}}
            />
            <View style={{marginLeft:10}}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    accessory:{
        position:'absolute', 
        padding:2, 
        bottom:0, 
        right:0, 
        backgroundColor:'grey', 
        borderRadius:25
    },
    title:{
        fontWeight:'bold', 
        fontSize:16,
    },
    subtitle:{
        color:'grey',
        fontSize:12,
    }
})