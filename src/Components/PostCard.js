import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Button, Divider, Text} from 'react-native-elements'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

import Avatar from './Avatar'

const PostCardHeader = (props) => {
    const {post, avatar} = props
    return(
        <View style={{flexDirection:'row', marginBottom:10}}>
            <Avatar
                uri={avatar.source.uri} 
                size={40}
            />
            <View style={{marginLeft:10}}>
                <Text style={{fontWeight:'bold', fontSize:16}}>
                    {post.name}
                </Text>
                <Text style={{color:'grey', fontSize:12}}>
                    {moment.unix(post.timestamp).fromNow()}
                </Text>
            </View>
        </View>
    )
}

const Post = (props) => {
    const {post} = props
    return(
      <View style={{paddingLeft:15, paddingTop:15}}>
        <PostCardHeader 
            post={post}
            avatar={{
                source:{uri:post.avatar||'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'},
                size:40,
            }}
        />
        <Text style={{fontSize:16}} >
            {post.body}
        </Text>
      </View>
    )
}

const PostCardFooter = (props) => {
    const {post} = props
    const navigation = useNavigation()
    return (
        <View style={{flexDirection:'row', justifyContent:'flex-start'}}>
            {/* <Button 
                containerStyle={{flex:1}}
                icon={{name:'arrow-up', type:'font-awesome', color:'grey', size:16}}
                title='0'
                titleStyle={{color:'grey'}}
                type='clear'
            />
            <Button 
                containerStyle={{flex:1}} 
                icon={{name:'arrow-down', type:'font-awesome', color:'grey', size:16}}
                title='0'
                titleStyle={{color:'grey'}}
                type='clear'
            /> */}
            <View style={{flex:1}}/>
            <View style={{flex:1}}/>
            <View style={{flex:1}}/>
            <Button 
                containerStyle={{flex:1}} 
                icon={{name:'comment-o', type:'font-awesome', color:'grey', size:16}}
                title={post.replyCount.toString()}
                titleStyle={{color:'grey'}}
                type='clear'
                onPress={() => navigation.navigate('NewPost',{post})}
            />
            {/* <Button 
                containerStyle={{flex:1}} 
                icon={{name:'share-2', type:'feather', color:'grey', size:16}}
                titleStyle={{color:'grey'}}
                title=' '
                type='clear'
            /> */}
        </View>
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
            {parent && post.parent? <RoundedPost post={post.parent} onPress={onPress}/> : (<></>)}
            <PostCardFooter post={post}/>
            <Divider/>
        </TouchableOpacity>
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