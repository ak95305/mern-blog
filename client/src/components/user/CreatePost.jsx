import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const getPost = async (id) => {
    const post = (await fetch(`http://localhost:5050/blog/${id}`)).json();
    return post;
};

function CreatePost() {
    const { id } = useParams();
    const navigate = new useNavigate();
    const [blogData, setBlogData] = useState(null);
    const [editBlog, setEditBlog] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const tagsArr = data.get("tags").split(", ");
        const newData = {
            title: data.get("title"),
            body: data.get("body"),
            tags: tagsArr,
        };
        setBlogData(newData);
    };

    useEffect(() => {
        if (blogData != null && id == undefined) {
            fetch("http://localhost:5050/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            }).catch((error) => {
                window.alert(error);
                return;
            });
            navigate("/user/blogs");
        } 
        else if (id && blogData != null) {
            fetch(`http://localhost:5050/${params.id}`, {
                method: "PATCH",
                body: JSON.stringify(blogData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate("/user/blogs");
        }
    }, [blogData]);

    useEffect(() => {
        if (id != undefined) {
            getPost(id).then((data) => {
                setEditBlog(data);
            });
        }
    }, []);

    return (
        <form
            className="form-blog"
            style={{ marginTop: "25px" }}
            onSubmit={handleSubmit}
        >
            <Typography
                variant="h5"
                component="h2"
                sx={{ textAlign: "center", fontWeight: 700 }}
            >
                {editBlog ? "Edit" : "Create"} Blog
            </Typography>
            <TextField
                id="filled-basic"
                label="Blog Title"
                variant="filled"
                sx={{ width: "100%", mt: 2 }}
                name="title"
                value={editBlog.title || ""}
                InputLabelProps={{ shrink: editBlog ? true : false }}
            />
            <TextField
                id="filled-textarea"
                label="Body"
                placeholder="Placeholder"
                multiline
                rows={10}
                variant="filled"
                sx={{ width: "100%", mt: 2 }}
                name="body"
                value={editBlog.body || ""}
                InputLabelProps={{ shrink: editBlog ? true : false }}
            />
            <TextField
                id="filled-basic"
                label="Tags - add comma(,)"
                variant="filled"
                sx={{ width: "100%", mt: 2 }}
                name="tags"
                value={editBlog.title || ""}
                InputLabelProps={{ shrink: editBlog ? true : false }}
            />
            <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                type="submit"
            >
                {editBlog ? "Edit" : "Create"}
            </Button>
        </form>
    );
}

export default CreatePost;
