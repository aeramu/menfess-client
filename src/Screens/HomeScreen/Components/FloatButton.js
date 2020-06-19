import React from 'react'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default (props) => {
    const {onPress} = props

    return(
        <Button
            containerStyle={{position: 'absolute', bottom: 30, right: 20}}
            buttonStyle={{borderRadius:40, padding:18}}
            icon={
                // {name:'pencil-plus', size:27, type:'material-community-icons', color:'white'}
                <Icon name="pencil-plus" size={27} color='white'/>
            }
            onPress={() => onPress()}
        />
    )
}