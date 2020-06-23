import React from 'react'
import {View, FlatList, ActivityIndicator} from 'react-native'
import {Button, Image} from 'react-native-elements'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost';
import {ProfileContext} from '../../Context'

import PostCard from '../../Components/PostCard'
import FloatButton from './Components/FloatButton'
import Avatar from '../../Components/Avatar'

const POST_LIST = gql`
  query($cursor: ID){
    justPostList(first: 20, after: $cursor){
      edges{
        id
        timestamp
        name
        avatar
        body
        replyCount
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
      cursor: "ffffffffffffffffffffffff"
    }
  })

  const morePost = () => {
    fetchMore({
      variables:{
        cursor: data.justPostList.pageInfo.endCursor
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        return {
          justPostList:{
            __typename: previousResult.justPostList.__typename,
            edges: [...previousResult.justPostList.edges,...fetchMoreResult.justPostList.edges],
            pageInfo: fetchMoreResult.justPostList.pageInfo
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
          size={30}
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
        bounces={false}
        data={data.justPostList.edges}
        ListHeaderComponent={<Button title='logout' onPress={() => removeProfile()}/>}
        renderItem={({item}) => 
          <PostCard post={item} onPress={handlePostClick}/>
        }
      />
      <FloatButton onPress={handleNewPostClick}/>
    </View>
  );
}