import React from 'react'
import {Image} from 'react-native-expo-image-cache'
import { View, TouchableOpacity } from 'react-native'

export default (props) => {
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
            {showAccessory? <></>:<></>}
        </TouchableOpacity>
    )
}