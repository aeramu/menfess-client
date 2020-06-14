import React from 'react'
import {View, FlatList} from 'react-native'
import {Button, Text} from 'react-native-elements'
import {useQuery} from '@apollo/react-hooks'
import { gql } from 'apollo-boost';

import {ProfileContext} from '../../Context'

const POST_LIST = gql`
  query($cursor: ID){
    justPostList(first: 2, after: $cursor){
      id
      body
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

  if (loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Loading....</Text>
    </View>
  )

  return (
    <FlatList
      refreshing={networkStatus === 4}
      onRefresh={() => refetch()}
      ListHeaderComponent={<>
        <Button
          title='Log Out'
          onPress={() => removeProfile()}
        />
      </>}
      data={data.justPostList}
      renderItem={({item}) => <Text style={{fontSize:60}}>{item.id+'\n'+item.body}</Text>}
      onEndReached={() => {
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
      }}
      ListFooterComponent={<>
        <Button
          title='New Post'
          onPress={()=>navigation.navigate('PostForm')}
        />
      </>}
    />
  );
}