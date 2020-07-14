import ApolloClient from 'apollo-boost'
import {AsyncStorage} from 'react-native'

export const client = new ApolloClient({
    uri: 'https://11kqrmkw35.execute-api.ap-southeast-1.amazonaws.com/graphql',
    // uri: 'http://192.168.43.82:8000',
    request: async (operation) => {
        const id = await AsyncStorage.getItem('id')
        operation.setContext({
          headers: {
            id: id
          }
        })
    }
})