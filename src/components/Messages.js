import React, { useState } from "react";
import { addMessage } from "../api/api";

const Messages = ({ token, post_ID, getPost}) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);


  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { success, error, message } = await addMessage(
      token,
      post_ID,
      message
    );

    if (success) {
      setMessage("");
      console.log("Message created!");
      await getPost();
    } else {
      setErrorMessage(error);
      console.log("Failed to add a message!");
    }
  };

  return (
    <>
      <form className="message-form" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="New Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
        {errorMessage ? (
          <p style={{ color: "red", backgroundColor: "maroon" }}>
            Operation Failed: {errorMessage}
          </p>
        ) : null}
      </form>
    </>
  );
};

export default Messages;