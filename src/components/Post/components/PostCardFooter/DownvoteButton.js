import React from 'react'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'

export default ({isVoted, voteCount, onPress}) => {
    return(
        <Button 
            containerStyle={{flex:1}} 
            icon={
                isVoted?
                <Icon name='frown' color='grey' size={18} style={{marginRight:5, marginTop:3}}/>
                :
                <Icon name='frowno' color='grey' size={18} style={{marginRight:5, marginTop:3}}/>
            }
            title={voteCount.toString()}
            titleStyle={{color:'grey'}}
            type='clear'
            onPress={() => onPress()}
        />
    )
}