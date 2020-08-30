import React from 'react'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'

export default ({voteCount, isVoted, onPress}) => {
    const icon = () => {
        const name = isVoted? 'smile-circle' : 'smileo'
        return (
            <Icon
                name={name}
                color='grey' 
                size={18} 
                style={{marginRight:5, marginTop:3}}
            />
        )
    }
    return(
        <Button 
            title={voteCount.toString()}
            titleStyle={{color:'grey'}}
            type='clear'
            containerStyle={{flex:1}} //perlu diubah
            icon={icon}
            onPress={() => onPress()}
        />
    )
}