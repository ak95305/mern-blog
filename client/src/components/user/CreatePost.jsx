import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const getPost = async (id) => {
    const post = (await fetch(`${serverURL}/blog/${id}`)).json();
    return post;
};

function CreatePost() {
    const { id } = useParams();
    const navigate = new useNavigate();
    const [blogData, setBlogData] = useState({
        title: "",
        body: "",
        tags: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (id == undefined) {
            fetch("${serverURL}/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            }).catch((error) => {
                window.alert(error);
                return;
            });
        }
        

        else if (id) {
            fetch(`${serverURL}/${id}`, {
                method: "PATCH",
                body: JSON.stringify(blogData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        
        navigate("/user/blogs");
    };

    console.log(blogData);

    useEffect(() => {
        if (id != undefined) {
            getPost(id).then((data) => {
                setBlogData({
                    title: data.title,
                    body: data.body,
                    tags: data.tags,
                });
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
                {id!=undefined ? "Edit" : "Create"} Blog
            </Typography>
            <TextField
                id="filled-basic"
                label="Blog Title"
                variant="filled"
                sx={{ width: "100%", mt: 2 }}
                name="title"
                value={blogData.title || ""}
                InputLabelProps={{ shrink: blogData ? true : false }}
                onChange={(e) =>
                    setBlogData({ ...blogData, title: e.target.value })
                }
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
                value={blogData.body || ""}
                InputLabelProps={{ shrink: blogData ? true : false }}
                onChange={(e) =>
                    setBlogData({ ...blogData, body: e.target.value })
                }
            />
            <TextField
                id="filled-basic"
                label="Tags - add comma(,)"
                variant="filled"
                sx={{ width: "100%", mt: 2 }}
                name="tags"
                value={blogData.tags.join(", ")}
                InputLabelProps={{ shrink: blogData ? true : false }}
                onChange={(e) =>
                    setBlogData({ ...blogData, tags: e.target.value.split(", ") })
                }
            />
            <Button
                variant="contained"
                size="small"
                sx={{ mt: 2 }}
                type="submit"
            >
                {id!=undefined ? "Edit" : "Create"}
            </Button>
        </form>
    );
}

export default CreatePost;
