import React from 'react'
import {FlatList} from 'react-native'
import {Overlay} from 'react-native-elements'
import {Avatar} from '../../../components'

export const AvatarOverlay = (props) => {
    const {data, onPress} = props
    return(
        <Overlay
            overlayStyle={{height:350}}
            {...props}
        >
            <FlatList
                numColumns={3}
                data={data}
                keyExtractor={(index) => index}
                renderItem={({item}) => 
                    <Avatar
                        uri={item}
                        containerStyle={{margin:10}}
                        size={70}
                        onPress={() => onPress(item)}
                    />
                }
            />
        </Overlay>
    )
}