import React from 'react'
import {TouchableOpacity} from 'react-native'

import {Post} from './Post'

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