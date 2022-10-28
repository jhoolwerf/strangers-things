import React from 'react'

const Home = ({user}) => {
  return (
    <>
    <h1>Stranger's Things</h1>
    {user && <h4>You are loggin in as: {user.username}</h4>}
    </>
  );
};

export default Home;