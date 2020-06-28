import React from 'react'
import {View, FlatList, ActivityIndicator} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost';
import {ProfileContext} from '../../Context'
import {PostCard, Avatar} from '../../Components'
import {FloatButton} from './Components'

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
      }
      pageInfo{
        endCursor
      }
    }
  }
`
export default ({navigation}) => {
  const {removeProfile, profileAvatar} = React.useContext(ProfileContext)
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
            edges: [...previousResult.menfessPostList.edges,...fetchMoreResult.menfessPostList.edges],
            pageInfo: fetchMoreResult.menfessPostList.pageInfo
          }
        }
      }
    })
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Avatar
          uri={profileAvatar}
          size={38}
          containerStyle={{marginRight:20}}
          onPress={() => navigation.navigate('Profile')}     
        />
      )
    })
  })

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
        //ListHeaderComponent={<Button title='logout' onPress={() => removeProfile()}/>}
        renderItem={({item}) => (
          <PostCard post={item} onPress={() => handlePostClick(item)}/>
        )}
      />
      <FloatButton onPress={() => handleNewPostClick()}/>
    </View>
  );
}