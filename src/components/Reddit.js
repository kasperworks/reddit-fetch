/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useDebounce from './useDebounce';

const Box = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 19px;
  width: 90%;
  margin-left: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: indianred;
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Item = styled.li`
  border-bottom: 1px dotted slategrey;
  padding: 0.5rem;
`;

const Poster = styled.div`
  font-size: 14px;
  margin: 0 3px 3px 0;
`;

const SearchField = styled.input`
  border-radius: 5px;
  padding: 12px;
  border: 1px dashed dimgrey;
  background: mistyrose;
`;

const Reddit = () => {
  const [state, setState] = useState({
    posts: [],
    loading: false,
    error: false,
  });

  const [sub, setSub] = useState('');

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSub(searchTerm);
  };

  const debouncedSearchTerm = useDebounce(sub);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setState({ posts: [], loading: 'Loading...', error: false });
      axios
        .get(`https://www.reddit.com/r/${debouncedSearchTerm}.json`)
        .then((res) => {
          const posts = res.data.data.children.map((obj) => obj.data);
          setState({ posts, loading: false, error: false });
        })
        .catch((err) => {
          setState({
            posts: [],
            loading: false,
            error: `Oh no, something went wrong! This might help: ${err.message}`,
          });
        });
    }
  }, [debouncedSearchTerm]);

  const { posts } = state;

  return (
    <Box>
      <h1>r/{sub}</h1>
      <p>
        Not sure where to start? Try one of these: reactjs, soccer, hockey,
        dataisbeautiful, architecturalrevival
      </p>
      <SearchField
        type="text"
        placeholder="Enter subreddit name"
        name="search"
        onChange={handleChange}
      />
      <List>
        {posts.map((post) => (
          <Item key={post.id}>
            {post.title}
            <Poster>
              posted by {post.author} / {post.num_comments}
              <Link
                href={`https://www.reddit.com${post.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                comments{' '}
              </Link>
              / vote score {post.score} /{' '}
              <Link href={post.url} target="_blank" rel="noopener noreferrer">
                Link
              </Link>
            </Poster>
          </Item>
        ))}
      </List>
      {state.loading}
      {state.error}
    </Box>
  );
};

export default Reddit;
