import React from 'react'
import {View, FlatList, ActivityIndicator} from 'react-native'
import {Avatar} from 'react-native-elements'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost';
import {ProfileContext} from '../../Context'

import PostCard from '../../Components/PostCard'
//import HeaderButton from './Components/HeaderButton'
import FloatButton from './Components/FloatButton'

const POST_LIST = gql`
  query($cursor: ID){
    justPostList(first: 20, after: $cursor){
      id
      timestamp
      name
      body
      parent{
        id
        timestamp
        name
        body
      }
    }
  }
`
export default ({navigation}) => {
  const {removeProfile} = React.useContext(ProfileContext)
  const {loading, data, networkStatus, refetch, fetchMore} = useQuery(POST_LIST,{
    variables:{
      cursor: "ffffffffffffffffffffffff"
    }
  })

  const morePost = () => {
    console.log('fetch more')
    fetchMore({
      variables:{
        cursor: data.justPostList[data.justPostList.length-1].id
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        return {
          justPostList: [...previousResult.justPostList,...fetchMoreResult.justPostList]
        }
      }
    })
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Avatar
          source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}
          rounded
          containerStyle={{marginRight:20}}
          onPress={() => removeProfile()}     
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
        //onEndReached={morePost()}
        data={data.justPostList}
        renderItem={({item}) => 
          <PostCard post={item} parent onPress={handlePostClick}/>
        }
      />
      <FloatButton onPress={handleNewPostClick}/>
    </View>
  );
}