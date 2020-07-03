import React from 'react'
import {
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import {RoomCard} from './Components'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

export default ({navigation}) => {
    const {loading, data} = useQuery(ROOM_LIST)
    if (loading) return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={50}/>
        </View>
    )

    const handleRoomClick = (room) => {
        navigation.navigate('Room',{room})
    }

    return(
        <View style={{flex:1}}>
        <FlatList
            data={data.menfessRoomList.edges}
            renderItem={({item}) => (
                <RoomCard 
                    name={item.name} 
                    description={item.description}
                    avatar={item.avatar} 
                    onPress={() => handleRoomClick(item)}
                />
            )}
        />
        </View>
    )
}

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