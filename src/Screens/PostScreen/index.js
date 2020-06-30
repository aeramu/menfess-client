import React from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'

import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

import PostCard from '../../Components/PostCard'
import { Divider } from 'react-native-elements'

const POST_QUERY = gql`
  query($id: ID!){
    menfessPost(id: $id){
      id
      replyCount
      upvoteCount
      downvoteCount
      upvoted
      downvoted
      child{
        edges{
          id
          timestamp
          name
          avatar
          body
          replyCount
          upvoteCount
          downvoteCount
          upvoted
          downvoted
        }
      }
    }
  }
`
export default ({navigation, route}) => {
  const {post} = route.params
  const {data, loading, refetch, networkStatus} = useQuery(POST_QUERY,{
    variables:{
      id: post.id
    }
  })

  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={50}/>
    </View>
  )

  const handlePostClick = (post) => {
    navigation.push('Post', {post})
  }

  return (
    <View style={{flex:1}}>
      <FlatList
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        // onEndReached={morePost()}
        data={data.menfessPost.child.edges}
        ListHeaderComponent={() =>
          <> 
            <PostCard post={post} repost onPress={() => {}}/>
            <Divider style={{backgroundColor:'light-grey', height:20}}/>
          </>
        }
        renderItem={({item}) => 
          <PostCard post={item} onPress={handlePostClick}/>
        }
      />
    </View>
  );
}