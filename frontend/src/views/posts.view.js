import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import PostCardList from "../components/postcardlist.component";

function PostsView() {
  /**
   * Basic params
   */
   const [posts, setPosts] = useState([]);
   const { request } = useHttp();
   const auth = useContext(AuthContext);
 
   /**
    * Get Posts
    */
   const getPosts = useCallback(async () => {
     try {
       const fetched = await request('/api/post/get-posts', 'GET', null, {
         'Authorization': `Bearer ${auth.token}`
       });
 
       setPosts(fetched);
     } catch (error) {
       
     }
   }, [auth, request]);
 
   useEffect(() => {
     getPosts();
   }, [getPosts]);

  return (
    <>
      { posts && <PostCardList posts={posts} /> }
    </>
  );
}

export default PostsView;
