/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Box = styled.div`
  font-family: 'BenchNine';
  font-size: 22px;
`;

const Poster = styled.span`
  font-size: 18px;
  margin: 3px;
`;

const Reddit = ({ subreddit }) => {
  const [state, setState] = useState({
    posts: [],
    loading: false,
    error: false,
  });

  useEffect(() => {
    setState({ posts: [], loading: 'Loading', error: false });
    axios
      .get(`https://www.reddit.com/r/${subreddit}.json`)
      .then((res) => {
        const posts = res.data.data.children.map((obj) => obj.data);
        setState({ posts, loading: false, error: false });
      })
      .catch((err) => {
        setState({ posts: [], loading: false, error: 'Something went wrong!' });
        console.error(err);
      });
  }, [subreddit]);

  const { posts } = state;

  return (
    <Box>
      <h1>r/{subreddit}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}
            <Poster>
              Posted by {post.author} / {post.num_comments} comments / score{' '}
              {post.score}
            </Poster>
          </li>
        ))}
      </ul>
      {state.loading}
      {state.error}
    </Box>
  );
};

export default Reddit;
