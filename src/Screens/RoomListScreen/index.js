import React from 'react'
import {
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

import {AvatarCard} from '../../Components'

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

export default () => {
    const {loading, data} = useQuery(ROOM_LIST)
    if (loading) return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={50}/>
        </View>
      )
    return(
        <View style={{flex:1}}>
        <FlatList
            // refreshing={networkStatus === 4}
            // onRefresh={() => refetch()}
            // onEndReached={() => morePost()}
            // onEndReachedThreshold={0.5}
            data={data.menfessRoomList.edges}
            renderItem={({item}) => (
            <AvatarCard 
                name={item.name} 
                avatar={{source:{uri:'https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg'}}}/>
            )}
        />
        {/* <FloatButton onPress={() => handleNewPostClick()}/> */}
        </View>
    )
}