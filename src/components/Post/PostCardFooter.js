import React from 'react'
import {View} from 'react-native'
import {Button} from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

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

export const PostCardFooter = (props) => {
    const {post} = props
    const navigation = useNavigation()
    const [upvote] = useMutation(UPVOTE_POST)
    const [downvote] = useMutation(DOWNVOTE_POST)

    const onUpvote = () => {
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
    }

    const onDownvote = () => {
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
    }

    return (
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
            <UpvoteButton
                voteCount={post.upvoteCount}
                isVoted={post.upvoted}
                onPress={() => onUpvote()}
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
                onPress={() => onDownvote()}
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

const UpvoteButton = ({voteCount, isVoted, onPress}) => {
    const icon = () => {
        const name = isVoted? 'smile-circle' : 'smileo'
        return (
            <AntDesign
                name={name}
                color='grey' 
                size={18} 
                style={{marginRight:5, marginTop:3}}
            />
        )
    }

    return(
        <Button 
            containerStyle={{flex:1}}
            icon={icon}
            title={voteCount.toString()}
            titleStyle={{color:'grey'}}
            type='clear'
            onPress={() => onPress()}
        />
    )
}