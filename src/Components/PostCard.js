import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {Button, Divider, ListItem, Text} from 'react-native-elements'
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

const Post = (props) => {
    const {post} = props
  
    return(
      <View style= {{paddingBottom:20}}>
        <ListItem
          title={post.name}
          subtitle={moment.unix(post.timestamp).fromNow()}
          titleStyle={{fontWeight:'bold'}}
          leftAvatar={{source:{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'}}}
        />
        <Text style={{fontSize:18, marginHorizontal:15}} >
          {post.body}
        </Text>
      </View>
    )
}

const RoundedPost = (props) => {
    const {post, onPress} = props
    return (
        <TouchableOpacity 
            style={{
                marginHorizontal:20, 
                marginBottom:20, 
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

const PostCardButton = (props) => {
    const {post} = props
    const navigation = useNavigation()

    return (
        <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Button 
                containerStyle={{flex:1}}
                buttonStyle={{paddingBottom:10}} 
                icon={{name:'arrow-up', type:'font-awesome', color:'grey'}}
                title='20'
                titleStyle={{color:'grey'}}
                type='clear'
            />
            <Button 
                containerStyle={{flex:1}} 
                icon={{name:'arrow-down', type:'font-awesome', color:'grey'}}
                buttonStyle={{paddingBottom:10}}
                title='20'
                titleStyle={{color:'grey'}}
                type='clear'
            />
            <Button 
                containerStyle={{flex:1}} 
                icon={{name:'comment-o', type:'font-awesome', color:'grey'}} 
                buttonStyle={{paddingBottom:10}}
                title={post.replyCount.toString()}
                titleStyle={{color:'grey'}}
                type='clear'
                onPress={() => navigation.navigate('NewPost',{post})}
            />
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
            <PostCardButton post={post}/>
            <Divider/>
        </TouchableOpacity>
    )
}