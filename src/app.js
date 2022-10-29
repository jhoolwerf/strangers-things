import React, {useState, useEffect} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, Posts, AccountForm, CreatePostForm, Item } from "./components/Index";
import { fetchPosts, getUser } from './api/api';
import "./app.css";

const App = () => {
    const [post, setPost] = useState([]);
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
    );
    const [user, setUser] = useState(null);

     const getPosts = async () => {
       const {error, posts} = await fetchPosts(token);
           if (error) {
                console.error(error);
              }
        
              setPost(posts);
            };
      useEffect(() => {
        getPosts();
      }, [token]);
        
     useEffect(() => {
        console.log("HERE");
            if (token) {
              const fetchUser = async () => {
                const { user } = await getUser(token);
                setUser(user);
              };
              fetchUser();
            }
          }, [token]);
        
          useEffect(() => {
            if (token) {
              window.localStorage.setItem("token", token);
            } else {
              window.localStorage.removeItem("token");
            }
          }, [token]);
        
          const logOut = () => {
            setToken(null);
            setUser(null);
            history.push("/");
          };

  return (
    <div className='container'>
        <nav className="ui secondary menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/listings">Posts</Link>
            <div className="right menu">
                {token ? (
                    <button onClick={logOut} className="item">Log Out</button>
                ) : (
                    <>
                    <Link className="item" to="/account/login">Log In</Link>
                    <Link className="item" to="/account/register">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
        <Switch>
          <Route exact path="/">
           <Home user={user} />
          </Route>
        <Route path="/posts/create">
          <CreatePostForm token={token} setPost={post} />
        </Route>
        <Route path="/posts/:posts_Id">
          <Posts token={token} post={post} getPosts={getPosts}/>
        </Route>
        <Route path="/posts">
          <Posts
            post={post}
            token={token}
            setPost={setPost}
          />
        </Route>
        <Route path="/account/:action">
          <AccountForm setToken={setToken} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;