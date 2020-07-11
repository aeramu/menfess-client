import React from 'react'
import { 
  View, 
  ActivityIndicator, 
  FlatList 
} from 'react-native'
import {PostCard} from '../../components'
import {Divider} from 'react-native-elements'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'

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
      <FlatList
        refreshing={networkStatus === 4}
        onRefresh={() => refetch()}
        data={data.menfessPost.child.edges}
        ListHeaderComponent={() =>
          <> 
            <PostCard post={data.menfessPost} repost onPress={() => {}}/>
            <Divider style={{backgroundColor:'light-grey', height:20}}/>
          </>
        }
        renderItem={({item}) => 
          <PostCard post={item} onPress={(post) => handlePostClick(post)}/>
        }
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