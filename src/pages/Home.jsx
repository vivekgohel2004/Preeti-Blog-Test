import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/blogs")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }
                return res.json();
            })
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/blogs/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                setPosts(posts.filter(post => post._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    };

    return (
        <div className="container">
            <h1 className="title">Welcome to My Blog</h1>
            <p className="subtitle">Explore the latest articles and stories</p>
            <Link to="/admin" className="add-post-button">Add New Post</Link>
            {loading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <h2>Error: {error}</h2>
            ) : (
                <div className="post-grid">
                    {posts.length > 0 ? (
                        posts.slice(0, 6).map((post) => (
                            <div key={post._id} className="post-card">
                                <div className="blog-content">
                                    <h2 className="blog-title">{post.title}</h2>
                                    <p className="blog-description">{post.content.substring(0, 150)}...</p>
                                    <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
                                    <div className="button-group">
                                        <button className="delete-button" onClick={() => handleDelete(post._id)}>Delete</button>
                                     
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No blog posts available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;
