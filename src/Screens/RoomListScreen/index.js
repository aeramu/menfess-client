import React from 'react'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

export default () => {
    return(
        <View style={{flex:1}}>
        <FlatList
            refreshing={networkStatus === 4}
            onRefresh={() => refetch()}
            onEndReached={() => morePost()}
            onEndReachedThreshold={0.5}
            data={data.menfessPostList.edges}
            renderItem={({item}) => (
            <PostCard post={item} onPress={() => handlePostClick(item)} repost/>
            )}
        />
        <FloatButton onPress={() => handleNewPostClick()}/>
        </View>
    )
}