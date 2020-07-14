import React from 'react'
import {TouchableOpacity, View, Linking} from 'react-native'
import {Button, Divider, Text} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import {AvatarCard} from './Avatar'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'

import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost';
import HyperLink from 'react-native-hyperlink'

const UPVOTE_POST = gql`
  mutation($postID: ID!){
    upvoteMenfessPost(postID: $postID){
        id
        upvoteCount
        downvoteCount
        upvoted
        downvoted
    }
  }
`
const DOWNVOTE_POST = gql`
  mutation($postID: ID!){
    downvoteMenfessPost(postID: $postID){
        id
        upvoteCount
        downvoteCount
        upvoted
        downvoted
    }
  }
`

const PostCardFooter = (props) => {
    const {post} = props
    const navigation = useNavigation()
    const [upvote] = useMutation(UPVOTE_POST)
    const [downvote] = useMutation(DOWNVOTE_POST)

    return (
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
            <Button 
                containerStyle={{flex:1}}
                icon={
                    post.upvoted?
                    <AntDesign name='smile-circle' color='grey' size={18} style={{marginRight:5, marginTop:3}}/>
                    :
                    <AntDesign name='smileo' color='grey' size={18} style={{marginRight:5, marginTop:3}}/>
                }
                title={post.upvoteCount.toString()}
                titleStyle={{color:'grey'}}
                type='clear'
                onPress={() => {
                    upvote({
                        variables:{
                            postID: post.id,
                        },
                        optimisticResponse:{
                            __typname: "Mutation",
                            upvoteMenfessPost:{
                                __typename: "MenfessPost",
                                id: post.id,
                                upvoted: !post.upvoted,
                                upvoteCount: post.upvoteCount + (post.upvoted? -1 : 1),
                                downvoted: false,
                                downvoteCount: post.downvoteCount + (post.downvoted? -1 : 0),
                            },
                        }
                    })
                }}
            />
            <Button 
                containerStyle={{flex:1}} 
                icon={
                    post.downvoted?
                    <AntDesign name='frown' color='grey' size={18} style={{marginRight:5, marginTop:3}}/>
                    :
                    <AntDesign name='frowno' color='grey' size={18} style={{marginRight:5, marginTop:3}}/>
                }
                title={post.downvoteCount.toString()}
                titleStyle={{color:'grey'}}
                type='clear'
                onPress={() => {
                    downvote({
                        variables:{
                            postID: post.id,
                        },
                        optimisticResponse:{
                            __typname: "Mutation",
                            downvoteMenfessPost:{
                                __typename: "MenfessPost",
                                id: post.id,
                                downvoted: !post.downvoted,
                                downvoteCount: post.downvoteCount + (post.downvoted? -1 : 1),
                                upvoted: false,
                                upvoteCount: post.upvoteCount + (post.upvoted? -1 : 0),
                            },
                        }
                    })
                }}
            />
            <Button 
                containerStyle={{flex:1}} 
                icon={{name:'comment-o', type:'font-awesome', color:'grey', size:16}}
                title={post.replyCount.toString()}
                titleStyle={{color:'grey'}}
                type='clear'
                onPress={() => navigation.navigate('NewPost',{post})}
            />
            <Button 
                containerStyle={{flex:1}} 
                icon={{name:'twitter-retweet', type:'material-community', color:'grey', size:22}}
                titleStyle={{color:'grey'}}
                title=' '
                type='clear'
                onPress={() => navigation.navigate('NewPost',{post, repost:true})}
            />
        </View>
    )
}

const Post = (props) => {
    const {post} = props
    return(
      <View style={{paddingHorizontal:15, paddingTop:15}}>
        <AvatarCard
            avatar={{
                uri:post.avatar||'https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg',
                size:40,
            }}
            title={post.name}
            subtitle={moment.unix(post.timestamp).fromNow()}
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

export const RoundedPost = (props) => {
    const {post, onPress} = props
    return (
        <TouchableOpacity 
            style={{
                paddingBottom:10, 
                borderWidth:0.5, 
                borderColor:'light-grey', 
                borderRadius:15, 
                overflow:'hidden'
            }}
            activeOpacity={0.5} 
            onPress={() => onPress? onPress(post):{}}
        >
            <Post post={post}/>
        </TouchableOpacity>
    )
}

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