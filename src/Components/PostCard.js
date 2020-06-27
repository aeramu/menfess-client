import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Button, Divider, Text} from 'react-native-elements'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'
import Avatar from './Avatar'

import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost';
import {ProfileContext} from '../Context'

const UPVOTE_POST = gql`
  mutation($accountID: ID!, $postID: ID!){
    upvoteMenfessPost(accountID: $accountID, postID: $postID){
        id
        replyCount
        upvoteCount
        downvoteCount
    }
  }
`
const DOWNVOTE_POST = gql`
  mutation($accountID: ID!, $postID: ID!){
    downvoteMenfessPost(accountID: $accountID, postID: $postID){
        id
        replyCount
        upvoteCount
        downvoteCount
    }
  }
`
const PostCardHeader = ({name, avatar, timestamp}) => {
    return(
        <View style={{flexDirection:'row', marginBottom:10}}>
            <Avatar
                uri={avatar.source.uri} 
                size={40}
            />
            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    {name}
                </Text>
                <Text style={{color:'grey', fontSize:12}}>
                    {moment.unix(timestamp).fromNow()}
                </Text>
            </View>
        </View>
    )
}

const PostCardFooter = (props) => {
    const {post} = props
    const navigation = useNavigation()
    const [upvote] = useMutation(UPVOTE_POST)
    const [downvote] = useMutation(DOWNVOTE_POST)
    const {profileID} = React.useContext(ProfileContext)

    return (
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
            <Button 
                containerStyle={{flex:1}}
                icon={{name:'arrow-up', type:'font-awesome', color: post.upvoted? 'red':'grey', size:16}}
                title={post.upvoteCount.toString()}
                titleStyle={{color:'grey'}}
                type='clear'
                onPress={() => {
                    upvote({
                        variables:{
                            postID: post.id,
                            accountID: profileID,
                        }
                    })
                }}
            />
            <Button 
                containerStyle={{flex:1}} 
                icon={{name:'arrow-down', type:'font-awesome', color: post.upvoted? 'red':'grey', size:16}}
                title={post.downvoteCount.toString()}
                titleStyle={{color:'grey'}}
                type='clear'
                onPress={() => {
                    downvote({
                        variables:{
                            postID: post.id,
                            accountID: profileID,
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
                icon={{name:'share-2', type:'feather', color:'grey', size:16}}
                titleStyle={{color:'grey'}}
                title=' '
                type='clear'
            />
        </View>
    )
}

const Post = (props) => {
    const {post} = props
    return(
      <View style={{paddingLeft:15, paddingTop:15}}>
        <PostCardHeader 
            name={post.name}
            avatar={{
                source:{uri:post.avatar||'https://qiup-image.s3.amazonaws.com/avatar/avatar.jpg'},
                size:40,
            }}
            timestamp={post.timestamp}
        />
        <Text style={{fontSize:16}} >
            {post.body}
        </Text>
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
            onPress={() => onPress(post)}
        >
            <Post post={post}/>
        </TouchableOpacity>
    )
}

export default (props) => {
    const {post, onPress, parent} = props
    return(
        <TouchableOpacity 
            style={{backgroundColor:'white'}} 
            activeOpacity={0.5}
            onPress={() => onPress(post)}
        >
            <Post post={post}/>
            {parent && post.parent && <RoundedPost post={post.parent} onPress={onPress}/>}
            <PostCardFooter post={post}/>
            <Divider/>
        </TouchableOpacity>
    )
}