import { Link } from "react-router-dom";
import "./styles/Post.css";
import { useContext, useEffect, useState } from "react";

//libraries
import LazyLoad from 'react-lazy-load';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//components
import Comment from "./Comment";
import PostOptions from "./PostOptions";

//context
import { PostContext } from "./UserContext";

//utils
import { getTime, getDate } from '../utility/format';



const Post = ({ fetchPosts }) => {

    const userId = localStorage.getItem('id');
    const { posts } = useContext(PostContext);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [toogleOptions, setToogleOptions] = useState(false);
    const profileLinkStyle = {
        width: "auto",
        textDecoration: "none"

    }
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (toogleOptions === false) {
            setShowDeleteModal(false);
        }

    }, [toogleOptions]);



    return (

        <ul className="posts-list">
            {

                posts?.length > 0 ? (
                    posts.map(function (post, index) {
                        const showOptions = selectedItemIndex === index;
                        return (
                            <LazyLoad key={post._id}>
                                <li className="post-item" key={post._id}>
                                    {
                                        showOptions && toogleOptions ? (
                                            <PostOptions post_id={post._id} fetchPosts={fetchPosts} setToogleOptions={setToogleOptions} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} user_id={userId} poster_id={post["user"]._id} />
                                        ) :
                                            (<></>)
                                    }
                                    <div className="post-options-btn" onClick={() => { setSelectedItemIndex(index); setToogleOptions(!toogleOptions); }}>
                                        <MoreHorizIcon style={{ fontSize: "36px" }} />
                                    </div>

                                    <div className="link-container">
                                        <Link to={`/profile/${post["user"]._id}`} style={profileLinkStyle}>
                                            <img className="post-user--photo" alt={post["user"].username} src={post["user"].profileImg} />
                                            <span className="post-username">{post["user"].username}</span>
                                        </Link>
                                    </div>
                                    <span className="post-date">
                                        {getDate(post.createdAt)}
                                    </span>
                                    <span className="post-time">
                                        {getTime(post.createdAt)}
                                    </span>
                                    <p className="post-content">{post.postContent}</p>
                                    {
                                        post.postImage && (
                                            <div className="post-image-container">
                                                <img className="post-image" src={post.postImage} alt="post img" />
                                            </div>
                                        )

                                    }
                                    <Comment postId={post._id} userId={userId} />
                                </li>
                            </LazyLoad>

                        )
                    }
                    )

                ) : (
                    <Stack spacing={1}>
                        <Skeleton animation="wave" variant="circular" width={50} height={50} />
                        <Skeleton animation="wave" variant="h1" style={{ width: "100%", height: "300px" }} />
                        <Skeleton animation="wave" variant="h1" style={{ width: "100%", height: "50px" }} />
                    </Stack>
                )
            }



        </ul >

    )
}

export default Post;