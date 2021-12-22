/**
 * Import settings
 */
import React from "react";
import { Routes, Route } from "react-router-dom";

/**
 * Import Views
 */
import AuthView from "./views/auth.view";

import PostsView from "./views/posts.view";
import DetailPostView from "./views/detailPost.view";
import CreatePostView from "./views/createPost.view";

/**
 * Function Route Config
 * @param {*} isAuth 
 * @returns 
 */
export const RoutesConfig = isAuth => {
    if (isAuth) {
        return(
            <Routes>
                <Route path="/" element={<PostsView />} />
                <Route path="create-post" element={<CreatePostView />} />
                <Route path="/post/:id" element={<DetailPostView />} />
            </Routes>  
        );
    }

    return(
        <Routes>
            <Route path="/" element={<AuthView />} />
        </Routes>
    );
};