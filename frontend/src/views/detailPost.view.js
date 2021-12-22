import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/auth.context";
import PostCard from "../components/postcard.component";

function DetailPostView() {
  /**
   * Basic params
   */
  const [post, setPost] = useState(null);
  const postId = useParams().id;
  const { request } = useHttp();
  const auth = useContext(AuthContext);

  /**
   * Get Post details
   */
  const getPost = useCallback(async () => {
    try {
      const fetched = await request(`/api/post/get-post/${postId}`, 'GET', null, {
        'Authorization': `Bearer ${auth.token}`
      });

      setPost(fetched);
    } catch (error) {
      
    }
  }, [auth, postId, request]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <>
      { post && <PostCard post={post} /> }
    </>
  );
}

export default DetailPostView;
