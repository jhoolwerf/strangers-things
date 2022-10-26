import React, {useState, useEffect} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Home, Listings } from "./components/Index";
import { fetchPosts } from './api/api';
import "./app.css";

const App = () => {
    const {post, setPost} = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const result = await fetchPosts()
                setPost(result)
            } catch (error) {
                console.error(error);
            }
        };
    }, []);

  return (
    <div className='container'>
        <nav className="ui text menu">
            <Link className="item" to="/">Home</Link>
            <Link className="item" to="/listings">Listings</Link>
        </nav>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route className="item" path="/listings">
                <Listings />
            </Route>
        </Switch>
    </div>
  )
}

export default App;