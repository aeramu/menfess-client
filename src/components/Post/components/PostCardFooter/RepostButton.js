import React from 'react'
import {Button} from 'react-native-elements'

export default ({onPress}) => {
    return(
        <Button 
            containerStyle={{flex:1}} 
            icon={{name:'twitter-retweet', type:'material-community', color:'grey', size:22}}
            titleStyle={{color:'grey'}}
            title=' '
            type='clear'
            onPress={() => onPress()}
        />
    )
}