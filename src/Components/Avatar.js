import React from 'react'
import {Image} from 'react-native-expo-image-cache'
import {TouchableOpacity, View, Text} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'

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
                style={{height:size,width:size,borderRadius:size}}
            />
            {showAccessory && 
                <Icon
                    name='mode-edit' 
                    style={{position:'absolute', padding:2,bottom:0, right:0, backgroundColor:'grey', borderRadius:25}}
                    size={20}
                    color='white'
                />
            }
        </TouchableOpacity>
    )
}

export const AvatarCard = ({name, avatar, timestamp}) => {
    return(
        <View style={{flexDirection:'row', marginBottom:10}}>
            <Avatar
                uri={avatar.source.uri} 
                size={40}
                onPress={() => {}}
            />
            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    {name}
                </Text>
                <Text style={{color:'grey', fontSize:12}}>
                    {moment.unix(timestamp).fromNow()}
                </Text>
            </View>
        </View>
    )
}