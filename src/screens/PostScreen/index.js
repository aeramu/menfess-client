import React from 'react'
import { 
  View, 
  ActivityIndicator
} from 'react-native'
import PostList from '../../components/PostList'
import {useQuery, gql} from '@apollo/client'

export default ({navigation, route}) => {
  const {post} = route.params
  const {data, loading, refetch, networkStatus} = useQuery(POST_QUERY,{
    variables:{
      id: post.id
    }
  })

  const handlePostClick = (post) => {
    navigation.push('Post', {post})
  }

  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={50}/>
    </View>
  )

  return (
    <View style={{flex:1}}>
      <PostList
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        data={data.menfessPost.child.edges}
        //TODO: pindahin ini ke PostList
        // ListHeaderComponent={() =>
        //   <> 
        //     <PostCard post={data.menfessPost} repost onPress={() => {}}/>
        //     <Divider style={{backgroundColor:'light-grey', height:20}}/>
        //   </>
        // }
        header={data.menfessPost}
        onItemPress={(post) => handlePostClick(post)}
      />
    </View>
  )
}

const POST_QUERY = gql`
  query($id: ID!){
    menfessPost(id: $id){
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
      room
      repost{
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
        room
      }
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
          room
        }
      }
    }
  }
`