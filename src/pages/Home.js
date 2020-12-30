import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
// import gql from 'graphql-tag'
import { Grid, Transition } from 'semantic-ui-react'

import PostCard from '../components/PostCard.js';
import PostForm from '../components/PostForm.js';

import { AuthContext } from '../context/auth.js';
import { FETCH_POSTS_QUERY } from '../util/graphql.js'

export default function Home() {
    const { user } = useContext(AuthContext);
    // const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const {
        loading,
        data: { getPosts: posts } = {}
    } = useQuery(FETCH_POSTS_QUERY);

    // if (data) {
    //     console.log(data.getPosts)
    // }

    return (
        <Grid columns={3} >
            <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                { user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    <Transition.Group>
                        {/* {data.getPosts && data.getPosts.map(post => (
                            <Grid.Column key={post.id}>
                                <PostCard post={post}/>
                            </Grid.Column>
                        ))} */}
                        {posts &&
                            posts.map((post) => (
                                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                    <PostCard post={post} />
                                </Grid.Column>
                        ))}
                    </Transition.Group>
                )}
                
            </Grid.Row>
        </Grid>
    )
}

