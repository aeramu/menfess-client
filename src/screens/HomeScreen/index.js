import React from 'react'
import {
  View,
  ActivityIndicator
} from 'react-native'
import {FloatButton} from '../../components'
import PostList from '../../components/PostList'
import {useQuery, gql} from '@apollo/client'

export default ({navigation}) => {
  const {loading, data, networkStatus, refetch, fetchMore} = useQuery(POST_LIST,{
    variables:{
      cursor: null
    }
  })

  const morePost = () => {
    fetchMore({
      variables:{
        cursor: data.menfessPostList.pageInfo.endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        return {
          menfessPostList:{
            __typename: previousResult.menfessPostList.__typename,
            edges: [
              ...previousResult.menfessPostList.edges,
              ...fetchMoreResult.menfessPostList.edges,
            ],
            pageInfo: fetchMoreResult.menfessPostList.pageInfo
          }
        }
      }
    })
  }

  const handlePostClick = (post) => {
    navigation.navigate('Post', {post})
  }

  const handleNewPostClick = () => {
    navigation.navigate('NewPost')
  }

  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={50}/>
    </View>
  )

  console.log(data)

  return (
    <View style={{flex:1}}>
      <PostList
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        onEndReached={() => morePost()}
        onEndReachedThreshold={0.5}
        data={data.menfessPostList.edges}
        onItemPress={(post)=>handlePostClick(post)}
      />
      <FloatButton onPress={() => handleNewPostClick()}/>
    </View>
  );
}

const POST_LIST = gql`
  query($cursor: ID){
    menfessPostList(first: 50, after: $cursor){
      edges{
        id
        timestamp
        name
        room
        avatar
        body
        replyCount
        upvoteCount
        downvoteCount
        upvoted
        downvoted
        repost{
          id
          timestamp
          name
          avatar
          body
          room
          replyCount
          upvoteCount
          downvoteCount
          upvoted
          downvoted
        }
      }
      pageInfo{
        endCursor
      }
    }
  }
`