import React from 'react'
import {FlatList} from 'react-native'
import {PostCard} from '../Post'
import {Divider} from 'react-native-elements'

export default (props) => {
    const {onItemPress, data, header} = props
    return (
        <FlatList
            {...props}
            data={data}
            renderItem={({item}) => (
                <PostCard 
                    post={item} 
                    onPress={(post) => onItemPress(post)} 
                    repost
                />
            )}
            ListHeaderComponent={() =>
                header?
                <> 
                  <PostCard post={header} repost onPress={() => {}}/>
                  <Divider style={{backgroundColor:'light-grey', height:20}}/>
                </>
                :<></>
            }
            
        />
    );
}