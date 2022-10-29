import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreatePostForm = ({token, posts}) => {
  const history = useHistory();
  const [description, setDescription] = useState("");
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  return (
    <form
      className="ui form"
      onSubmit={async (event) => {
        event.preventDefault();
        const {error, listing} = await CreatePostForm(
          token,
          description,
          listing
        );
        if(listing) {
          listing.isCreator = true;
          setPost((prevPost) => [...prevPost, posts]);
          setDescription("");
          setPost("");
          history.push("/posts");
        } else {
          setErrorMessage(error);
        }
      }}
    >
      <h2>Create Post</h2>
      <div className="field">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          placeholder="What are you selling?"
          required
          autoComplete="off"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          ></input>
      </div>
      <div className="field">
        <label htmlFor="listing">Listing</label>
        <input
          name="listing"
          type="text"
          placeholder="Please describe the item."
          autoComplete="off"
          value={posts}
          onChange={(event) => setPost(event.target.value)}
        ></input>
      </div>

        {errorMessage ? (
          <p className="ui negative message">{errorMessage}</p>
        ) : null}

        <button type="submit" className="ui button">Create</button>
    </form>
  );
};

export default CreatePostForm;