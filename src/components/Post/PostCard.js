import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Divider} from 'react-native-elements'
import Post from './components/Post'
import {RoundedPost} from './RoundedPost'
import PostCardFooter from './components/PostCardFooter'


export const PostCard = (props) => {
    const {post, onPress, repost} = props
    return(
        <TouchableOpacity 
            style={{backgroundColor:'white'}} 
            activeOpacity={0.5}
            onPress={() => onPress(post)}
        >
            <Post post={post}/>
            {repost && post.repost && 
                <View style={{marginHorizontal:15, marginTop:5}}>
                    <RoundedPost post={post.repost} onPress={onPress}/>
                </View>    
            }
            <PostCardFooter post={post}/>
            <Divider/>
        </TouchableOpacity>
    )
}