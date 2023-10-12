import { Link, useAsyncError } from "react-router-dom";
import "./styles/Post.css";
import LazyLoad from 'react-lazy-load';
import Comment from "./Comment";
import { PostContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { getTime, getDate } from '../utility/format';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShareIcon from '@mui/icons-material/Share';
import axios from "axios";


const PostOptions = ({ setToogleOptions, post_id, fetchPosts, user_id, poster_id, showDeleteModal, setShowDeleteModal }) => {

    return (
        <div className="options-container">
            {
                user_id === poster_id && (
                    <div className="options-item">
                        <div className="edit-btn">
                            <EditIcon style={{ color: "fff", fontSize: "20px" }} />
                            <Link to={`/edit_post/${post_id}`} style={{ color: "#fff", textDecoration: "none", width: "100%" }}>Edit</Link>
                        </div>
                    </div>)
            }
            {
                user_id === poster_id && (
                    <div className="options-item">
                        <div className="delete-btn" onClick={() => { setShowDeleteModal(!showDeleteModal); }}>
                            <DeleteForeverIcon style={{ color: "fff", fontSize: "20px" }} />
                            <Link to="" style={{ color: "#fff", textDecoration: "none", width: "100%" }}>Delete</Link>
                        </div>
                    </div>)
            }
            <div className="options-item">
                <div className="share-btn">
                    <ShareIcon style={{ color: "fff", fontSize: "20px" }} />
                    <Link to={`/edit_post/${post_id}`} style={{ color: "#fff", textDecoration: "none", width: "100%" }}>Share</Link>
                </div>
            </div>
            {
                showDeleteModal && (<DeletePostModal setToogleOptions={setToogleOptions} fetchPosts={fetchPosts} setShowDeleteModal={setShowDeleteModal} post_id={post_id} />)
            }


        </div>
    )
}


export const DeletePostModal = ({ setToogleOptions, fetchPosts, setShowDeleteModal, post_id }) => {

    const closeModal = () => {
        setShowDeleteModal(false);
    }


    const deletePost = () => {


        axios.post("/delete-post", { post_id })
            .then((response) => {
                console.log(response);
                fetchPosts();
                setShowDeleteModal(false);
                setToogleOptions(false);
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="delete-post-container">
            <p>Are you sure to delete this post?</p>
            <div className="delete-post-btns">
                <button className="yes-btn" onClick={() => deletePost()}>Yes</button>
                <button className="no-btn" onClick={() => closeModal()}>No</button>
            </div>
        </div>

    )
}


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