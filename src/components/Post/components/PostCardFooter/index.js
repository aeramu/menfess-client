import React from 'react'
import {View} from 'react-native'
import UpvoteButton from './UpvoteButton' 
import DownvoteButton from './DownvoteButton' 
import CommentButton from './CommentButton' 
import RepostButton from './RepostButton'

import {useNavigation} from '@react-navigation/native'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

export default (props) => {
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
            <DownvoteButton
                voteCount={post.downvoteCount}
                isVoted={post.downvoted}
                onPress={() => onDownvote()}
            />
            <CommentButton 
                count={post.replyCount.toString()}
                onPress={() => navigation.navigate('NewPost',{post})}
            />
            <RepostButton
                onPress={() => navigation.navigate('NewPost',{post, repost:true})}
            />
        </View>
    )
}

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