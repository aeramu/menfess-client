import React from 'react'
import {
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

import {RoomCard} from './Components'

const ROOM_LIST = gql `
    query{
        menfessRoomList{
            edges{
                id
                name
            }
        }
    }
`

export default ({navigation}) => {
    const {loading, data} = useQuery(ROOM_LIST)
    if (loading) return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={50}/>
        </View>
    )

    const handleRoomClick = (id) => {
        navigation.navigate('Room',{id})
    }

    return(
        <View style={{flex:1}}>
        <FlatList
            data={data.menfessRoomList.edges}
            renderItem={({item}) => (
                <RoomCard name={item.name} onPress={() => handleRoomClick(item.id)}/>
            )}
        />
        </View>
    )
}