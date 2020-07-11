import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import {
    Divider,
} from 'react-native-elements'
import {AvatarCard} from '../../../components'

export const RoomCard = ({name, description, onPress, avatar}) => {
    return(
        <TouchableOpacity
            style={styles.container} 
            activeOpacity={0.5} 
            onPress={() => onPress? onPress() : {}}
        >
            <AvatarCard 
                title={name}
                subtitle={description || ''}
                avatar={{uri: avatar || 'https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg'}}
                style={styles.avatarCard}
            />
            <Divider/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white'
    },
    avatarCard:{
        padding: 15
    },
})