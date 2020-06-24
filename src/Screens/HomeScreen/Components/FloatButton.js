import React from 'react'
import {Button, Icon} from 'react-native-elements'

export default (props) => {
    const {onPress} = props
    return(
        <Button
            containerStyle={{position: 'absolute', bottom: 30, right: 20}}
            buttonStyle={{borderRadius:40, padding:18, backgroundColor:'#900e66'}}
            icon={
                <Icon 
                    name="pencil-plus" 
                    size={27} 
                    color='white' 
                    type='material-community'
                />
            }
            onPress={() => onPress()}
        />
    )
}