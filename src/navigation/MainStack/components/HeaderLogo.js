import React from 'react'
import {View, Image} from 'react-native'

export default () => {
    return(
        <View style={{flexDirection:'row'}}>
            <Image
                source={require('../../../../assets/icon.png')}
                style={{marginLeft:20, marginRight:10, height:25, width:25}}
                resizeMode='contain'
            />
            <Image
                source={require('../../../../assets/menfess.png')}
                style={{height:25, width:80}}
                resizeMode='contain'
            />
        </View>
    )
}