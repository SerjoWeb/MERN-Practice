import React from "react";
import { NavLink } from "react-router-dom";

function PostCard({ posts }) {
    const Pstyles = {
        whiteSpace: 'nowrap',
        width: '320px',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    };

    const PCStyles = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    };

    if (posts.length <= 0) {
        return (
            <p>There are not posts yet.</p>
        )
    }

    return (
        <div className="postcards" style={PCStyles}>
            {
                posts.map(post => {
                    return (
                        <div className="postcard">
                            <h1>{post.title}</h1>
                            <p>{new Date(post.date).toLocaleDateString()}</p>
                            <p style={Pstyles}>{post.context}</p>
                            <NavLink to={`/post/${post._id}`}>Read more...</NavLink>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default PostCard;
