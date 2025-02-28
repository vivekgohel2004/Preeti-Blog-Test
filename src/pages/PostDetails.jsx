import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles.css";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/blogs/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
                setLoading(false);
                
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <h2>Error: {error}</h2>;

    return (
        <div className="container post-details">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p><strong>Tags:</strong> {post.tags?.length ? post.tags.join(", ") : "No Tags"}</p>
            <Link to="/" className="read-more">Back to Home</Link>
        </div>
    );
}

export default PostDetails;
