import React from 'react'
import {
    View,
    ActivityIndicator,
} from 'react-native'
import RoomList from '../../components/RoomList'
import {useQuery, gql} from '@apollo/client'

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
            <RoomList
                data={data.menfessRoomList.edges}
                onItemPress={(item) => handleRoomClick(item)}
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
                avatar
            }
        }
    }
`