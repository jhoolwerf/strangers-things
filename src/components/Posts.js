import React from 'react'
import Item from './Item';
import { Link } from "react-router-dom";
import { deletePost } from '../api/api';

const Posts = ({ post, setPost, token }) => {
  console.log("posts", post);

  const handleDeleteClick = async (post_ID) => {
    await deletePost(token, post_ID);
    setPost((prevPost) =>
    prevPost.filter((post) => post.id !== post_ID)
    );
  };
  
  return (
    <>
      <Link to="/posts/create" className="ui button">Create Post</Link>
      <div className="listing-container">
        {post.map((post) => {
          return (
            <PostDetail key={post.id} post={post}
            headerElement={post.isCreator ? <div className="right floated aligned tiny header">My Post</div> : null}
            >
              {post.isCreator ? (
                <button onClick={() => handleDeleteClick(post.id)}
                className="negative ui button left floated"
                >
                  Delete</button>
              ) : null}
              </PostDetail>
          );
        })}
      </div>
    </>
  )};

export default Posts;