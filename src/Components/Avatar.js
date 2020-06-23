import React from 'react'
import {Image} from 'react-native-expo-image-cache'
import { View } from 'react-native'

export default (props) => {
    const {uri, size, onPress, containerStyle} = props
    return(
        <View style={containerStyle}>
            <Image
                uri={uri}
                style={{height:size,width:size,borderRadius:size}}
                onPress={() => onPress()}
            />
        </View>
    )
}