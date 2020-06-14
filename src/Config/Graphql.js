import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
    uri: 'https://11kqrmkw35.execute-api.ap-southeast-1.amazonaws.com/graphql'
})