import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { deletePost } from '../api/api';
import { Messages } from './Index';

const Item = ({item, setPost, token}) => {

const handleDeleteClick = async (token, id) => {
  await deletePost(token, id);
  setPost((previousPost) =>
    previousPost.filter((posts) => posts.id !== id)
    );
};

  return (
    <div className="ui card">
      <div className="left floated aligned header">{item.title}</div>
        {item.isAuthor ? (
          <div className="right floated aligned tiny header">Mine</div>
        ) : null}
        <div className="centered aligned description">
          <p>{item.description}</p>
          <div className="extra content">
            <div className=" center aligned header">
              <Link to={`/users/me`}>View More</Link>
            </div>
            {item.isAuthor ? (
                <button onClick={() => handleDeleteClick(item.id)}
                className="negative ui button left floated"
                >
                  Delete</button>
              ) : null}
          </div>
        </div>
        <div
          role="list"
          className="ui divided relaxed list"
          style={{ color: 'whitesmoke' }}
        >
          {item.messages.map((message) => {
            return (
              <div key={message._id} role="listitem" className="item">
                {/* <b>{message.username}</b>
                <p className="description">{message.content}</p> */}
                <Messages />
              </div>
            );
            })};
         </div>
        </div>
  );
};


export default Item;
