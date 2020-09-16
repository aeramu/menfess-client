import ApolloClient from 'apollo-boost'
import {AsyncStorage} from 'react-native'

export const client = new ApolloClient({
    uri:'http://menfess-server.herokuapp.com', //from heroku
    //uri: 'https://owcc3bfav4.execute-api.ap-southeast-1.amazonaws.com/graphql', //from aws qiupdeveloper
    //uri: 'https://11kqrmkw35.execute-api.ap-southeast-1.amazonaws.com/graphql', //from aws nakonigtur
    // uri: 'http://192.168.43.82:8000', //from local
    request: async (operation) => {
        const id = await AsyncStorage.getItem('id')
        operation.setContext({
          headers: {
            id: id
          }
        })
    }
})