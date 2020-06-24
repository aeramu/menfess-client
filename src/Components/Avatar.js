import React from 'react'
import {Image} from 'react-native-expo-image-cache'
import {TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

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