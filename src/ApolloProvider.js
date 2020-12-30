import React from 'react'
import App from './App.js'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'

// pointing to our graphql server
const httpLink = createHttpLink({
    // uri: 'http://localhost:5000'
    uri: 'https://sleepy-basin-26199.herokuapp.com/'
})

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

// cache stores in memory data
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    // onError: (e) => { console.log(e) }
    // cache: new InMemoryCache({
    //     typePolicies: {
    //         Query: {
    //             fields: {
    //                 getPosts: {
    //                     merge(existing = [], incoming: []) {
    //                         return incoming;
    //                     }
    //                 }
    //             }
    //         },
    //         Post: {
    //             fields: {
    //                 likes: {
    //                     merge(existing = [], incoming: []) {
    //                         return incoming;
    //                     }
    //                 },
    //                 comments: {
    //                     merge(existing = [], incoming: []) {
    //                         return incoming;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // })
});

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)