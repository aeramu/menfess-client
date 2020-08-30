import React from 'react'
import {Button} from 'react-native-elements'

export default ({onPress, count}) => {
    return(
        <Button 
            containerStyle={{flex:1}} 
            icon={{name:'comment-o', type:'font-awesome', color:'grey', size:16}}
            title={count.toString()}
            titleStyle={{color:'grey'}}
            type='clear'
            onPress={() => onPress()}
        />
    )
}