import React, {useState, useEffect} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, Listings, AccountForm, CreateListingForm, Item } from "./components/Index";
import { fetchPosts } from './api/api';
import "./app.css";

const App = () => {
    const {post, setPost} = useState([]);
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
    );

    useEffect(() => {
        const getPosts = async () => {
            const {error, posts} = await fetchPosts(token);
            if (error) {
                console.error(error);
              }
        
              setPost(posts);
            };
            getPosts();
          }, [token]);
        
          useEffect(() => {
            console.log("HERE");
            if (token) {
              const getGuest = async () => {
                const { guest } = await fetchGuest(token);
                setGuest(guest);
              };
              getGuest();
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
            setGuest(null);
            history.push("/");
          };

  return (
    <div className='container'>
        <nav className="ui text menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/listings">Listings</Link>
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
                <Home guest={guest}/>
            </Route>
            <Route className="item" path="/listings">
                <Listings />
            </Route>
        </Switch>
    </div>
  )
}

export default App;