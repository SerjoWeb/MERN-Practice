import React from "react";

function PostCard({ post }) {
    return (
        <div className="postcard">
            <h1>{post.title}</h1>
            <p>{new Date(post.date).toLocaleDateString()}</p>
            <p>{post.context}</p>
        </div>
    );
}

export default PostCard;
