import React, {useState, useEffect} from 'react'
import Item from './Item';
import { Link } from "react-router-dom";

const Posts = ({ post, setPost, token }) => {

  const [searchTerm, setSearchTerm] = useState("");
     
  
  return (
    <>
      <Link to="/posts/create" className="ui button">Create Post</Link>
      <div className="search">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <i className="search icon"></i>
        </div>
        <div className="filtered">
          {post.filter((post) => {
            if (searchTerm === "") {
              return post;
            } else if (
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.description.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return post;
            }
          }).map((post) => {
            return <Item className="listing-container" key={post._id} item={post} setPost={setPost} token={token} />
          })}
        </div>
    </>
  )};

export default Posts;