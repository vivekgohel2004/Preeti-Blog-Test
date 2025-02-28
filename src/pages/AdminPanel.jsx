import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                content,
                tags: tags.split(",").map((tag) => tag.trim()),
                image, 
            }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Post added successfully!");
                setTitle("");
                setContent("");
                setTags("");
                setImage("");
            })
            .catch((error) => console.error("Error adding post:", error));
    };

    return (
        <div className="container admin-panel">
            <h2>Add New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <button type="submit">Add Post</button>
            </form>
            <button className="go-back-button" onClick={() => navigate("/")}>
                Go Back to Home
            </button>
        </div>
    );
}

export default AdminPanel;
