import React from 'react'
import {View, ActivityIndicator} from 'react-native'
import {useQuery, gql} from '@apollo/client'
import {FloatButton} from '../../components'
import PostList from '../../components/PostList'

export default ({navigation, route}) => {
  const {room} = route.params
  const {loading, data, networkStatus, refetch, fetchMore} = useQuery(POST_LIST,{
    variables:{
      ids: [room.id],
      cursor: null
    }
  })

  // const morePost = () => {
  //   fetchMore({
  //     variables:{
  //       cursor: data.menfessPostList.pageInfo.endCursor
  //     },
  //     updateQuery: (previousResult, {fetchMoreResult}) => {
  //       return {
  //         menfessPostList:{
  //           __typename: previousResult.menfessPostList.__typename,
  //           edges: [...previousResult.menfessPostList.edges,...fetchMoreResult.menfessPostList.edges],
  //           pageInfo: fetchMoreResult.menfessPostList.pageInfo
  //         }
  //       }
  //     }
  //   })
  // }

  const handlePostClick = (post) => {
    navigation.navigate('Post', {post})
  }

  const handleNewPostClick = () => {
    navigation.navigate('NewPost', {room})
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
        // onEndReached={() => morePost()}
        // onEndReachedThreshold={0.5}
        data={data.menfessPostRooms.edges}
        onItemPress={(post) => handlePostClick(post)}
      />
      <FloatButton onPress={() => handleNewPostClick()}/>
    </View>
  );
}

const POST_LIST = gql`
  query($cursor: ID, $ids: [ID!]!){
    menfessPostRooms(ids: $ids,first: 20, after: $cursor){
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
      }
      pageInfo{
        endCursor
      }
    }
  }
`