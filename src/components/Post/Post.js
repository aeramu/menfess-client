import React from 'react'
import {View, Text} from 'react-native'
import {AvatarCard} from '../Avatar'
import moment from 'moment'
import HyperLink from 'react-native-hyperlink'

export const Post = (props) => {
    const {post} = props
    return(
      <View style={{paddingHorizontal:15, paddingTop:15}}>
        <AvatarCard
            avatar={{
                uri:post.avatar||'https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg',
                size:40,
            }}
            title={post.name}
            subtitle={moment.unix(post.timestamp).fromNow() + " @" + post.room}
            style={{marginBottom:8}}
        />
        <HyperLink linkDefault linkStyle={{color:'blue'}}>
            <Text style={{fontSize:16}} >
                {post.body}
            </Text>
        </HyperLink>
      </View>
    )
}