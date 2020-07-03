import React from 'react'
import {
  View, 
  FlatList, 
  ActivityIndicator
} from 'react-native'
import {
  PostCard, 
  FloatButton
} from '../../Components'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

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

  return (
    <View style={{flex:1}}>
      <FlatList
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        onEndReached={() => morePost()}
        onEndReachedThreshold={0.5}
        data={data.menfessPostList.edges}
        renderItem={({item}) => (
          <PostCard post={item} onPress={(post) => handlePostClick(post)} repost/>
        )}
      />
      <FloatButton onPress={() => handleNewPostClick()}/>
    </View>
  );
}

const POST_LIST = gql`
  query($cursor: ID){
    menfessPostList(first: 20, after: $cursor){
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
        }
      }
      pageInfo{
        endCursor
      }
    }
  }
`