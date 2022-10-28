import React from 'react'
import { Link } from 'react-router-dom';



export const Item = ({item, setItem, token}) => {
  const handleDeleteClick = async (_postID) => {
    await deletePost(token, _postID);
    setItem((prevItem) =>
      prevItem.filter((item) => item.id !== _postID)
    );
  };

  return (
    <div className="ui card">
      <div className="left floated aligned header">{post.item}</div>
        {post.isCreator ? (
          <div className="right floated aligned tiny header">Mine</div>
        ) : null}
        <div className="centered aligned description">
          <p>{item.description}</p>
          <div className="extra content">
            <div className=" center aligned header">
              <Link to="">View Description</Link>
            </div>
          </div>
        </div>
        <div
          role="list"
          className="ui divided relaxed list"
          style={{ color: 'whitesmoke' }}
        >
          {post.isCreator ? (
            <button
              onClick={() => handleDeleteClick(post.id)}
              className="negative ui button left floated"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>
)};


export default Item;
