import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Avatar} from './Avatar'

export const AvatarCard = ({title, avatar, subtitle, style}) => {
    return(
        <View style={{flexDirection:'row', ...style}}>
            <Avatar
                uri={avatar.uri} 
                size={40}
                onPress={() => {}}
            />
            <View style={{marginLeft:10}}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontWeight:'bold', 
        fontSize:16,
    },
    subtitle:{
        color:'grey',
        fontSize:12,
    }
})