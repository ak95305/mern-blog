import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";
import { Pagination } from "@mui/material";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


const blogs = async (pageNo = 1, limit = 5) => {
    const post = (
        await fetch(`http://localhost:5050/blogs?pageno=${pageNo}&limit=${limit}`)
    ).json();
    return post;
};

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [postCount, setPostCount] = useState(0);

    useEffect(() => {
        blogs(pageNo, 10).then((post) => {
            setPosts(post.data);
            setPostCount(post.count);
        });
    }, [pageNo]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 5 }}
                    >
                        <Grid item>
                            <Typography
                                variant="h6"
                                color="inherit"
                                noWrap
                            >
                                All Blogs
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="small">Add</Button>
                        </Grid>
                    </Grid>
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {posts.map((post) => (
                            <Grid item key={post._id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: "56.25%",
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            gutterBottom
                                            variant="h6"
                                            component="h6"
                                        >
                                            {post.title}
                                        </Typography>
                                        <Typography className="line-clamp">
                                            {post.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="outlined">
                                            Edtt
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                        >
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={Math.ceil(postCount / 10)}
                        variant="outlined"
                        shape="rounded"
                        sx={{ mt: 2 }}
                        onChange={(event, value) => {
                            setPageNo(value);
                        }}
                    />
                </Container>
            </main>
        </ThemeProvider>
    );
}
