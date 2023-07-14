import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Editor from './blog-editor/index';
import List from './contents/index';
import Dafts from './drafts/index';
import Blogview from './blog-view';
import Signup from './signup';
import Login from './login';


const ReactRouter = () => {

    const isAuthenticated = localStorage.getItem('token')

    const router = createBrowserRouter([
        {
            path:"/editor",
            element:<Editor isAuthenticated={isAuthenticated}/>
        },
        {
            path:"/contents/draft",
            element:<Dafts isAuthenticated={isAuthenticated}/>,
        },
        {
            path:"/contents/posted",
            element:<List isAuthenticated={isAuthenticated}/>,
        },
        {
            path:"/view",
            element:<Blogview isAuthenticated={isAuthenticated}/>,
        },
        {
            path:"/signup",
            element:<Signup isAuthenticated={isAuthenticated}/>,
        },
        {
            path:"/",
            element:<Login isAuthenticated={isAuthenticated}/>,
        },
        {
            path:"/login",
            element:<Login isAuthenticated={isAuthenticated}/>,
        },
    ]);

    return (<div class="wrapper">
    <nav class="nav">
        <div class="nav-logo">
            <p>BLOG .</p>
        </div>
        <div class="nav-menu" id="navMenu">
            <ul>
                <li><a href="/" class="link">Home</a></li>
                {!isAuthenticated && <li><a href="/" class="link active">Login</a></li>}
                <li><a href="/" class="link">Blog</a></li>
                {isAuthenticated && <li><a href="http://localhost:3000/editor" class="link">Blog Editor</a></li>}
            </ul>
        </div>
        {!isAuthenticated && <div class="nav-button">
            <button className="btn white-btn" id="loginBtn">Sign Up</button>
        </div>}
    </nav>  
    <RouterProvider router = {router}/>
    </div>)
}

export default ReactRouter;