import React from 'react'
import {
    FlatList,
} from 'react-native'
import RoomCard from './components/RoomCard'

export default ({data, onItemPress}) => {
    return(
        <FlatList
            data={data}
            renderItem={({item}) => (
                <RoomCard 
                    name={item.name} 
                    description={item.description}
                    avatar={item.avatar} 
                    onPress={() => onItemPress(item)}
                />
            )}
        />
    )
}